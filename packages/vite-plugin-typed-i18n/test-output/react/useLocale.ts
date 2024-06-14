import {
  defaultLocale,
  locales,
  LocalizedStrings
} from './index';
import {
  createContext,
  useContext
} from 'react';

const localStorageActiveLocaleKey = 'typed-i18n-chosen-locale';

export interface LocalizedStringsProxy extends LocalizedStrings {
  isProxy: boolean;
}

function localeProxyGetter(_target: unknown, prop: string, _receiver: unknown) {
  switch (prop) {
    case 'locale':
      return defaultLocale;
    case 'isProxy':
      return true;

    default:
      return localeSectionPlaceholder;
  }
}

function localeSectionProxyGetter() {
  return '';
}
localeSectionProxyGetter.toString = () => '';

export const localePlaceholder = new Proxy(
  {},
  {
    get: localeProxyGetter
  }
) as LocalizedStrings;

const localeSectionPlaceholder = new Proxy(
  {},
  {
    get: localeSectionProxyGetter
  }
);

export const localeContext = createContext(localePlaceholder);

export function findSupportedLocale(providedLocale: string | undefined) {
  const rankedLocales = [
    providedLocale,
    safeLoadLocalePreference(),
    Intl.DateTimeFormat().resolvedOptions().locale,
    defaultLocale
  ];
  return rankedLocales.find(locale => locale && locales.includes(locale))!;
}

export function useLocale(): LocalizedStrings {
  return useContext(localeContext);
}

export function safeLoadLocalePreference() {
  try {
    return window.localStorage.getItem(localStorageActiveLocaleKey);
  } catch (_error) {
    return null;
  }
}

export function safeSaveLocalePreference(value: string) {
  try {
    window.localStorage.setItem(localStorageActiveLocaleKey, value);
  } catch (_error) {
    return;
  }
}
