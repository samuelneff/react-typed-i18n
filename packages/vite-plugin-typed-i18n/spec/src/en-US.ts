import IntlMessageFormat, { PrimitiveType } from 'intl-messageformat';
import {
  LocalizedStrings,
  HomeIntroProps,
  HomeWelcomeProps,
} from './index';

const formatters = {} as Record<string, IntlMessageFormat>;

export const strings: LocalizedStrings = {
  locale: 'en-US',
  home: {
    title: 'Home',
    welcome(props: HomeWelcomeProps) {
      return (
        formatters[ 'home.welcome' ] ?? (
          formatters[ 'home.welcome' ] = new IntlMessageFormat(
            [
              { type: 0, value: 'Hello ' },
              { type: 1, value: 'firstName' },
              { type: 0, value: '!' }
            ],
            '%locale%'
          )
        )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },
    intro(props: HomeIntroProps) {
      return (
        formatters[ 'home.intro' ] ?? (
          formatters[ 'home.intro' ] = new IntlMessageFormat(
            [
              { type: 0, value: "Welcome back! It's been " },
              {
                type: 6,
                value: 'days',
                options: {
                  '=0': { value: [ { type: 0, value: 'no time at all' } ] },
                  '=1': { value: [ { type: 0, value: 'just a day' } ] },
                  other: {
                    value: [ { type: 1, value: 'days' }, { type: 0, value: ' days' } ]
                  }
                },
                offset: 0,
                pluralType: 'cardinal'
              },
              { type: 0, value: '.' }
            ],
            '%locale%'
          )
        )
      ).format(props as unknown as Record<string, PrimitiveType>) as string;
    },
  },
  login: {
    title: 'Sign-in',
    email: 'E-Mail',
    password: 'Password',
    forgot: 'Forgot password',
    submit: 'Submit',
  },
};