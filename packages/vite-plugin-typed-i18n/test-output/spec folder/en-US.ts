///////////////////////////////////
//
// GENERATED FILE - DO NOT EDIT
//
// Localized strings for en-US.
//
import IntlMessageFormat, { PrimitiveType } from 'intl-messageformat';
import {
  LocalizedStrings,
  HomeWelcomeProps,
  HomeIntroProps,
  HomeWelcomeProps,
  HomeIntroProps,

} from './index';

const formatters = {} as Record<string, IntlMessageFormat>;

export const strings: LocalizedStrings = {
  locale: 'en-US',
  home: {
    title: "Home",
    welcome(props: HomeWelcomeProps) {
      return (
        formatters['homeWelcome'] ?? (
          formatters['homeWelcome'] = new IntlMessageFormat(
            [
              {
                "type": 0,
                "value": "Hello "
              },
              {
                "type": 1,
                "value": "firstName"
              },
              {
                "type": 0,
                "value": "!"
              }
            ],
            '%locale%'
          )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },
    intro(props: HomeIntroProps) {
      return (
        formatters['homeIntro'] ?? (
          formatters['homeIntro'] = new IntlMessageFormat(
            [
              {
                "type": 0,
                "value": "Welcome back! It's been "
              },
              {
                "type": 6,
                "value": "days",
                "options": {
                  "=0": {
                    "value": [
                      {
                        "type": 0,
                        "value": "no time at all"
                      }
                    ]
                  },
                  "=1": {
                    "value": [
                      {
                        "type": 0,
                        "value": "just a day"
                      }
                    ]
                  },
                  "other": {
                    "value": [
                      {
                        "type": 1,
                        "value": "days"
                      },
                      {
                        "type": 0,
                        "value": " days"
                      }
                    ]
                  }
                },
                "offset": 0,
                "pluralType": "cardinal"
              },
              {
                "type": 0,
                "value": "."
              }
            ],
            '%locale%'
          )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },

  },
  home: {
    title: "Casa",
    welcome(props: HomeWelcomeProps) {
      return (
        formatters['homeWelcome'] ?? (
          formatters['homeWelcome'] = new IntlMessageFormat(
            [
              {
                "type": 0,
                "value": "¡Hola "
              },
              {
                "type": 1,
                "value": "firstName"
              },
              {
                "type": 0,
                "value": "!"
              }
            ],
            '%locale%'
          )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },
    intro(props: HomeIntroProps) {
      return (
        formatters['homeIntro'] ?? (
          formatters['homeIntro'] = new IntlMessageFormat(
            [
              {
                "type": 0,
                "value": "¡Bienvenido de nuevo! Ha pasado "
              },
              {
                "type": 6,
                "value": "days",
                "options": {
                  "=0": {
                    "value": [
                      {
                        "type": 0,
                        "value": "solo un rato"
                      }
                    ]
                  },
                  "=1": {
                    "value": [
                      {
                        "type": 0,
                        "value": "solo un día"
                      }
                    ]
                  },
                  "other": {
                    "value": [
                      {
                        "type": 1,
                        "value": "days"
                      },
                      {
                        "type": 0,
                        "value": " días"
                      }
                    ]
                  }
                },
                "offset": 0,
                "pluralType": "cardinal"
              },
              {
                "type": 0,
                "value": " desde que estuviste aquí."
              }
            ],
            '%locale%'
          )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },

  },
  login: {
    title: "Sign-in",
    email: "E-Mail",
    password: "Password",
    forgot: "Forgot password",
    submit: "Submit",

  },

};
