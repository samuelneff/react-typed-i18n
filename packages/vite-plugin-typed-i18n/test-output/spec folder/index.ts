///////////////////////////////////
//
// GENERATED FILE - DO NOT EDIT
//
// Entrypoint for generated localized strings.
//

export const locales = [
  "en-US",
  "es-US"
];

export const defaultLocale = 'en-US';

export interface LocalizedStrings {
  locale: string;
  home: {
    title: string;
    welcome(props: HomeWelcomeProps): string;
    intro(props: HomeIntroProps): string;
    tagTest(props: HomeTagTestProps): string;
  };
  login: {
    title: string;
    email: string;
    password: string;
    forgot: string;
    submit: string;
  };
}

export interface HomeWelcomeProps {
  firstName: string;
}
export interface HomeIntroProps {
  days: string;
}
export interface HomeTagTestProps {

}

export async function getLocalizedStrings(locale: string) {
  if (!locales.includes(locale)) {
    throw new Error(`Requested an unsupported locale. Requested ${ locale }. Available locales are ${ locales.join(', ') }.`);
  }

  const stringsModule = await import(/* @vite-ignore */ `./${ locale }`);
  return stringsModule.strings as LocalizedStrings;
}


