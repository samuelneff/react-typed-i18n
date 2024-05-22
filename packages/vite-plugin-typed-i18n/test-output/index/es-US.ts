///////////////////////////////////
//
// GENERATED FILE - DO NOT EDIT
//
// Localized strings for es-US.
//
import IntlMessageFormat, { PrimitiveType } from 'intl-messageformat';
import {
  LocalizedStrings,
  HomeWelcomeProps,
  HomeIntroProps,
} from './index';

const formatters = {} as Record<string, IntlMessageFormat>;

export const strings: LocalizedStrings = {
  locale: 'es-US',
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
        )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },
  },
  login: {
    title: "Iniciar sesión",
    email: "Correo",
    password: "Contraseña",
    forgot: "Olvido mi contraseña",
    submit: "Vamos",
  },
};
