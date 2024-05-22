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
    %sectionName%: {
    title: string;
    welcome(props: HomeWelcomeProps): string;
    intro(props: HomeIntroProps): string;

  };  %sectionName%: {
    title: string;
    welcome(props: HomeWelcomeProps): string;
    intro(props: HomeIntroProps): string;
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


export function getLocale(locale: string) {
  if (!locales.includes(locale)) {
    throw new Error(`Requested an unsupported locale. Requested ${ locale }. Available locales are ${ locales.join(', ') }.`);
  }

  const stringsModule = await import(`./${ locale }`);
  return stringsModule.strings;
}
