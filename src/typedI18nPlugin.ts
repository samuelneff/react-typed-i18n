import * as fs from 'fs/promises';
import { camelCase, upperFirst } from 'lodash';
import * as path from 'path';
import { PluginContext } from 'rollup';
import { HmrContext, Plugin } from 'vite';
import { parse as parseYaml } from 'yaml';
import {
  isNullOrUndefined,
  isString,
  replacePlaceholers,
  substringStart,
} from 'utikity';
import { IntlMessageFormat } from 'intl-messageformat';
import { MessageFormatElement, TYPE } from '@formatjs/icu-messageformat-parser';
import { } from '../../typed-i18n/src';
export type TypedI18nPopulationStrategy = 'none' | 'copy' | 'placeholder' | 'translate';

export interface TypedI18nPluginProps {
  sourceDir: string;
  outDir: string;
  defaultLocale?: string;
  reactSupport?: boolean;
  templatesDir?: string;
  missingText?: string;
  populateOtherLocales?: Popul;
  populatePlaceholder?: string;
}

type StringTree = Record<string, Record<string, string>>;

const digitStartPattern = /^\d/;

const ERROR_DEFAULT_LOCALE_STOP_ALL = 'Since this is the default locale all localization will stop and new localized files will not be generated.';
const ERROR_OTHER_LOCALE_SKIP = 'Since this is a translated locale it will be skipped but localization of other locales will proceed.'
const ERROR_KEY_EXCLUDED = 'This key will be excluded from all locales.';
const WARN_KEY_EXCLUDED = 'This key will be excluded from this locale.';

export function typedI18nPlugin({
  sourceDir,
  outDir,
  defaultLocale,
  templatesDir,
  reactSupport: reactSupportProp,
  missingText,
  populateOtherLocales,
  populatePlaceholder,
}: TypedI18nPluginProps) {

  const appliedDefaultLocale = defaultLocale ?? Intl.DateTimeFormat().resolvedOptions().locale;
  const appliedTemplatesDir = templatesDir ?? path.join(__dirname, '../templates');

  let indexStringsMemberConstTemplate: string;
  let indexStringsMemberFormatTemplate: string;
  let indexPropTypeMemberTemplate: string;
  let indexPropTypeDeclarationTemplate: string;
  let indexStringsSectionTemplate: string;
  let indexFileTemplate: string;
  let localeMemberConstTemplate: string;
  let localeFileTemplate: string;
  let localeImportPropTypeTemplate: string;
  let localeMemberFormatTemplate: string;
  let localeSectionTemplate: string;

  let localizedStringProviderFileTemplate: string;
  let localeReactSupportTemplate: string;
  let tagFunctionsTemplate: string;
  let useLocaleFileTemplate: string;

  let stringsTypeSections = '';
  let propTypeDeclarations = '';
  let sectionTypeMembers = '';
  let importPropTypes = '';
  let localizedStringsSectionMembers = '';
  let localizedStringsSections = '';
  let reactSupportReexports = '';

  let locales: string[];
  let viteContext: PluginContext;
  let defaultStrings = {} as StringTree;
  let reactSupport: boolean;

  return {
    name: 'typedI18n',
    async buildStart(this: PluginContext) {
      viteContext = this;

      indexFileTemplate = await loadTemplate('indexFile.txt');
      indexStringsSectionTemplate = await loadTemplate('indexStringsSection.txt');
      indexStringsMemberConstTemplate = await loadTemplate('indexStringsMemberConst.txt');
      indexStringsMemberFormatTemplate = await loadTemplate('indexStringsMemberFormat.txt');
      indexPropTypeDeclarationTemplate = await loadTemplate('indexPropTypeDeclaration.txt');
      indexPropTypeMemberTemplate = await loadTemplate('indexPropTypeMember.txt');
      localeFileTemplate = await loadTemplate('localeFile.txt');
      localeImportPropTypeTemplate = await loadTemplate('localeImportPropType.txt');
      localeSectionTemplate = await loadTemplate('localeSection.txt');
      localeMemberConstTemplate = await loadTemplate('localeMemberConst.txt');
      localeMemberFormatTemplate = await loadTemplate('localeMemberFormat.txt');
      tagFunctionsTemplate = await loadTemplate('tagFunctionsFile.txt');

      reactSupport = typeof reactSupportProp === 'boolean'
        ? reactSupportProp
        : await detectReactSupport();

      if (reactSupport) {
        localizedStringProviderFileTemplate = await loadTemplate('LocalizedStringProviderFile.txt');
        reactSupportReexports = await loadTemplate('indexReactSupport.txt');
        useLocaleFileTemplate = await loadTemplate('useLocaleFile.txt');
        localeReactSupportTemplate = await loadTemplate('localeReactSupport.txt');
      }

      this.addWatchFile(sourceDir);
      await readLocaleDirs();
      await generateAllLocales();
    },

    async handleHotUpdate({ file }: HmrContext) {

      if (!file.startsWith(sourceDir) || !isYaml(file)) {
        return;
      }
      const hotLocale = path.basename(path.dirname(file));
      if (hotLocale === appliedDefaultLocale) {
        await generateAllLocales();
      } else {
        await generateLocale(hotLocale);
      }
    }
  } as Plugin;

  async function detectReactSupport() {
    const sourceDir = substringStart(outDir, '/src/');
    if (!sourceDir) {
      return false;
    }

    const files = await fs.readdir(sourceDir, { recursive: true });
    return files.some(filepath => filepath.endsWith('.tsx'));
  }

  async function readLocaleDirs() {
    const newLocales = await fs.readdir(sourceDir);
    const defaultIndex = newLocales.indexOf(appliedDefaultLocale);

    if (defaultIndex === -1) {
      viteContext.warn(`typed-i18n: No localization found for default locale '${ appliedDefaultLocale }. Found ${ newLocales.join(',') }.`);
    } else {
      newLocales.splice(defaultIndex, 1);
      newLocales.unshift(appliedDefaultLocale);
    }

    locales = newLocales;
  }

  async function generateAllLocales() {
    for (const locale of locales) {
      await generateLocale(locale);
    }
  }

  async function generateLocale(locale: string) {
    const localeDir = path.join(sourceDir, locale);
    const filesnames = (
      await fs.readdir(localeDir)
    ).filter(isYaml);

    importPropTypes = '';
    localizedStringsSections = '';
    stringsTypeSections = '';
    propTypeDeclarations = '';

    for (const filename of filesnames) {
      const filePath = path.join(localeDir, filename);
      const sectionName = camelCase(substringStart(filename, '.'));
      const sectionText = await safeReadFile(filePath);
      if (sectionText === null) {
        continue;

      }
      const sectionStrings: Record<string, string> = safeParseYaml(sectionText, filePath);
      if (sectionStrings === null) {
        continue;
      }
      if (locale === appliedDefaultLocale) {
        defaultStrings[ sectionName ] = {};
      }
      localizeSection(sectionName, sectionStrings);
    }

    const localeFileContent = fillInTemplate(
      localeFileTemplate,
      {
        importPropTypes,
        locale,
        localizedStringsSections,
        reactSupportLocalizedStrings: reactSupport ? localeReactSupportTemplate : '',
      }
    );

    await fs.writeFile(path.join(outDir, `${ locale }.ts`), localeFileContent);

    if (locale === appliedDefaultLocale) {

      if (reactSupport) {
        await fs.writeFile(path.join(outDir, 'LocalizedStringProvider.tsx'), localizedStringProviderFileTemplate);
        await fs.writeFile(path.join(outDir, 'useLocale.ts'), useLocaleFileTemplate);
      }

      await fs.writeFile(path.join(outDir, 'tag-functions.ts'), tagFunctionsTemplate);

      const indexFileContent = fillInTemplate(
        indexFileTemplate,
        {
          localeList: `"${ locales.join('",\n  "') }"`,
          appliedDefaultLocale,
          stringsTypeSections,
          propTypeDeclarations,
          reactSupportReexports,
        }
      );
      await fs.writeFile(path.join(outDir, 'index.ts'), indexFileContent);
    }

    function createLogMessage(
      message: string,
      error?: unknown,
      defaultLocaleMessage?: string,
      otherLocaleMessage?: string,
    ) {
      let fullMessage = `typed-i18n: [${ locale }] ${ message }`;

      if (locale === appliedDefaultLocale) {
        if (defaultLocaleMessage) {
          fullMessage += `\n\n${ defaultLocaleMessage }`;
        }
      } else if (otherLocaleMessage) {
        fullMessage += `\n\n${ otherLocaleMessage }`;
      }

      if (error) {
        fullMessage += `\n\n${ (error as Error).stack ?? error }`
      }
      return fullMessage;
    }

    function warnOrError(
      message: string,
      error?: unknown,
      defaultLocaleMessage?: string,
      otherLocaleMessage?: string,
    ) {
      let fullMessage = createLogMessage(
        message,
        error,
        defaultLocaleMessage,
        otherLocaleMessage
      );

      if (locale === appliedDefaultLocale) {
        viteContext.error(fullMessage);
      }
      viteContext.warn(fullMessage);

      return fullMessage;
    }

    function safeReadFile(filePath: string) {
      try {
        return fs.readFile(filePath, 'utf-8');
      } catch (error) {
        warnOrError(
          `Error reading localization file.\n${ filePath }`,
          error,
          ERROR_DEFAULT_LOCALE_STOP_ALL,
          ERROR_OTHER_LOCALE_SKIP,
        );
        return null;
      }
    }

    function safeParseYaml(yamlText: string, filePath: string) {
      try {
        return parseYaml(yamlText);
      } catch (error) {
        warnOrError(
          `Error parsing YAML file.\n${ filePath }`,
          error,
          ERROR_DEFAULT_LOCALE_STOP_ALL,
          ERROR_OTHER_LOCALE_SKIP,
        );
        return null;
      }
    }

    function localizeSection(sectionName: string, sectionStrings: Record<string, string>) {
      try {
        localizedStringsSectionMembers = '';
        sectionTypeMembers = '';
        const entries = Object.entries(sectionStrings);
        for (const [key, value] of entries) {
          localizeEntry(sectionName, key, value);
        }

        localizedStringsSections += fillInTemplate(
          localeSectionTemplate,
          {
            sectionName,
            localizedStringsSectionMembers,
          }
        )

        if (locale === appliedDefaultLocale) {
          stringsTypeSections += fillInTemplate(
            indexStringsSectionTemplate,
            {
              sectionName,
              sectionTypeMembers,
            }
          );
        }
      } catch (error) {
        viteContext.warn(
          createLogMessage(
            `An unexpected error processing '${ sectionName }.'`,
            error,
            `This portion of localization will be excluded from all locales.`,
            'This portion of localization will be excluded from this locale.'
          )
        );
      }

    }

    function localizeEntry(
      sectionName: string,
      key: string,
      value: unknown,
    ) {
      const camelKey = camelCase(key);
      if (digitStartPattern.test(camelKey)) {
        viteContext.warn(
          createLogMessage(
            `Invalid localization key '${ sectionName }.${ key }'. Keys cannot start with a number.`,
            undefined,
            ERROR_KEY_EXCLUDED,
            WARN_KEY_EXCLUDED
          )
        );
        return;
      }

      if (isNullOrUndefined(value)) {
        return;
      }

      if (!isString(value)) {
        viteContext.warn(
          createLogMessage(
            `Unsupported localization value found '${ sectionName }.${ key }'. Only strings are supported but '${ typeof value }' was found.`,
            undefined,
            ERROR_KEY_EXCLUDED,
            WARN_KEY_EXCLUDED
          )
        );
        return;
      }

      const defaultSectionStrings = defaultStrings[ sectionName ];
      if (locale !== appliedDefaultLocale && !(camelKey in defaultSectionStrings)) {
        viteContext.warn(
          createLogMessage(
            `Non-matching localization key found; '${ sectionName }.${ key }'. Only keys in the default locale '${ appliedDefaultLocale }' are allowed in the other locales.`,
            undefined,
            '',
            WARN_KEY_EXCLUDED
          )
        );
        return;
      }

      if (!value.includes('{')) {
        localizedStringsSectionMembers += fillInTemplate(
          localeMemberConstTemplate,
          {
            camelKey,
            value: JSON.stringify(value)
          }
        );
        if (locale === appliedDefaultLocale) {
          sectionTypeMembers += fillInTemplate(
            indexStringsMemberConstTemplate,
            {
              camelKey
            }
          );
          defaultSectionStrings[ key ] = 'string';
        }
        return;
      }

      const valueAst = new IntlMessageFormat(value).getAst();
      const valueArgs = parseMessageArgs(
        sectionName,
        key,
        valueAst
      );

      if (valueArgs === null) {
        // already warned
        return;
      }

      const propsType = `${ upperFirst(sectionName) }${ upperFirst(camelKey) }Props`;
      const formatterKey = `${ sectionName }${ upperFirst(camelKey) }`;

      importPropTypes += fillInTemplate(
        localeImportPropTypeTemplate,
        {
          propsType
        }
      );

      localizedStringsSectionMembers += fillInTemplate(
        localeMemberFormatTemplate,
        {
          camelKey,
          locale,
          propsType,
          formatterKey,
          ast: JSON.stringify(valueAst, undefined, 2).replace(/\n/g, '\n            ')
        }
      );

      if (locale === appliedDefaultLocale) {
        sectionTypeMembers += fillInTemplate(
          indexStringsMemberFormatTemplate,
          {
            camelKey,
            propsType,
          }
        );

        const formatPropMembers = Object.entries(valueArgs).map(
          ([ propName, propType ]) => fillInTemplate(
            indexPropTypeMemberTemplate,
            {
              propName,
              propType,
            }
          )
        ).join('');

        propTypeDeclarations += fillInTemplate(
          indexPropTypeDeclarationTemplate,
          {
            propsType,
            formatPropMembers
          }
        );
        defaultSectionStrings[ key ] = 'function';
      }
    }

    function parseMessageArgs(
      sectionName: string,
      key: string,
      messageAst: MessageFormatElement[]
    ) {
      const XML_TAGS_UNSUPPORTED = 'XML_TAGS_UNSUPPORTED';

      const args = {} as Record<string, string>;
      try {
        parseMessageArgsImpl(messageAst, args);
        return args;
      } catch (error) {
        if (error === XML_TAGS_UNSUPPORTED) {
          return null;
        }
        throw error;
      }

      function parseMessageArgsImpl(subMessageAst: MessageFormatElement[], args: Record<string, string>) {

        for (const part of subMessageAst) {
          let dataType = '';
          const name = 'value' in part ? part.value : '';
          const options = 'options' in part ? part.options : null;
          const children = 'children' in part ? part.children : null;

          switch (part.type) {
            case TYPE.literal:
              break;

            case TYPE.argument:
              dataType = 'string';
              break;

            case TYPE.number:
              dataType = 'number';
              break;

            case TYPE.date:
            case TYPE.time:
              dataType = 'Date';
              break;

            case TYPE.select:
              dataType = 'string';
              break;

            case TYPE.plural:
              dataType = 'number';
              break;

            case TYPE.pound:
              break;

            case TYPE.tag:
              break;
          }

          if (dataType) {
            if (dataType === 'string' && args[ name ]) {
              // already encountered and might be another type, which would be more accurate
            }
            args[ name ] = dataType;
          }

          if (options) {
            parseMessageArgsImpl(
              Object.values(options).flatMap(option => option.value),
              args
            );
          }
          if (children) {
            parseMessageArgsImpl(children, args);
          }
        }
      }
    }
  }

  function isYaml(filename: string) {
    return filename.endsWith('.yaml') || filename.endsWith('.yml');
  }

  async function loadTemplate(filename: string) {
    const templatePath = path.join(appliedTemplatesDir, filename);
    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (error) {
      viteContext.error(`typed-i18n: Error reading template file. Localization failed.\n\nFile: ${ templatePath }\n\n${ (error as Error).stack ?? error }`);
    }
  }

  function fillInTemplate(template: string, placeholders: Record<string, unknown>) {
    const trimmedPlaceholders = {} as Record<string, unknown>;
    for (const [ key, value ] of Object.entries(placeholders)) {
      trimmedPlaceholders[ key ] = String(value).trimEnd();
    }
    return replacePlaceholers(
      {
        text: template,
        placeholders: trimmedPlaceholders,
        markerPrefix: '%',
        markerSuffix: '%'
      }
    );
  }
}

