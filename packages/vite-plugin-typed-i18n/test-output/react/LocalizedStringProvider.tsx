import {
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  LocalizedStrings,
  getLocalizedStrings,
  locales,
} from './index';
import {
  LocalizedStringsProxy,
  findSupportedLocale,
  localeContext,
  localePlaceholder,
  safeSaveLocalePreference
} from './useLocale';

export interface LocalizedStringProviderProps {
  locale?: string;
  children: ReactNode;
}

export function LocalizedStringProvider({ locale, children }: LocalizedStringProviderProps) {
  console.log('LocalizedStringProvider running');
  const chooseLocale = useCallback(
    async (newLocale: string) => {
      if (!locales.includes(newLocale)) {
        throw new Error(`Cannot switch locale to '${ newLocale }' which is not one of the supported locales. Supported locales include '${ locales.join(', \'') }'.`);
      }
      const strings = await getLocalizedStrings(newLocale);
      setActiveLocale(
        {
          ...strings,
          chooseLocale
        }
      );
      safeSaveLocalePreference(newLocale);
    },
    []
  );

  const [ activeLocale, setActiveLocale ] = useState(createLocaleWrapper(localePlaceholder));

  useEffect(
    () => {
      async function chooseDefaultLocale() {
        console.log('LocalizedStringProvider::useEffect running');
        const effectiveLocale = findSupportedLocale(locale);
        const strings = await getLocalizedStrings(effectiveLocale);
        console.log('LocalizedStringProvider::useEffect continuing');
        setActiveLocale(
          {
            ...strings,
            chooseLocale
          }
        );
      }
      chooseDefaultLocale();
    },
    [
      locale,
      chooseLocale,
    ]
  );

  function createLocaleWrapper(localizedStrings: LocalizedStrings) {

    if ((localizedStrings as LocalizedStringsProxy).isProxy) {
      localizedStrings.chooseLocale = chooseLocale;
      return localizedStrings;
    }

    return {
      ...localizedStrings,
      chooseLocale
    } as LocalizedStrings;
  }

  return (
    <localeContext.Provider value={activeLocale}>
      {children}
    </localeContext.Provider>
  );
}
