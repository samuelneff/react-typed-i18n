import * as path from 'path';
import { PluginContext } from 'rollup';
import { HmrContext, Plugin } from 'vite';
import { GenerateLocalesPropsBase, generateLocales } from './typed-i18n';
export type TypedI18nPopulationStrategy = 'none' | 'copy' | 'placeholder' | 'translate';

export interface TypedI18nPluginProps extends GenerateLocalesPropsBase {
}

export function typedI18nPlugin(props: TypedI18nPluginProps) {

  const {
    sourceDir,
    defaultLocale,
  } = props;
  const appliedDefaultLocale = defaultLocale ?? Intl.DateTimeFormat().resolvedOptions().locale;
  let viteContext: PluginContext;

  return {
    name: 'typedI18n',
    async buildStart(this: PluginContext) {
      viteContext = this;

      this.addWatchFile(sourceDir);
      await generateLocale();
    },

    async handleHotUpdate({ file }: HmrContext) {

      if (!file.startsWith(sourceDir) || !/\.ya?ml$/.test(file)) {
        return;
      }
      const hotLocale = path.basename(path.dirname(file));
      await generateLocale(
        hotLocale === appliedDefaultLocale
          ? hotLocale
          : undefined
      );
    }
  } as Plugin;

  async function generateLocale(locale?: string) {
    await generateLocales({
      locale,
      logWarn(message: string) {
        viteContext.warn(message);
      },
      logError(message: string) {
        viteContext.error(message);
      },
      ...props
    });
  }
}
