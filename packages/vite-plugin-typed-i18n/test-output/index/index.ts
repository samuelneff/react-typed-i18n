///////////////////////////////////
//
// GENERATED FILE - DO NOT EDIT
//
// Entrypoint for generated localized strings.
//

export const locales = [
];

export const defaultLocale = 'en-US';

export interface LocalizedStrings {
  locale: string;
  home: {
    title: string;
    welcome(props: HomeWelcomeProps): string;
    intro(props: HomeIntroProps): string;
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

export const localeProvider = {
  locales: [
    "en-US",
    "es-US"
  ],
  defaultLocale: 'en-US',

  async getLocale(locale: string) {
    if (!this.locales.includes(locale)) {
      throw new Error(`Requested an unsupported locale. Requested ${ locale }. Available locales are ${ locales.join(', ') }.`);
    }

    const stringsModule = await import(`./${ locale }`);
    return stringsModule.strings as LocalizedStrings;
  }
};
