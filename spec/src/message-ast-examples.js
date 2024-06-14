// Hello {name}! There are {count, plural, =0 {no} =1 {one} other {more}} people.
[
  { type: 0, value: 'Hello ' },
  { type: 1, value: 'name' },
  { type: 0, value: '! There are ' },
  {
    type: 6,
    value: 'count',
    options: {
      '=0': { value: [{ type: 0, value: 'no' }] },
      '=1': { value: [{ type: 0, value: 'one' }] },
      other: { value: [{ type: 0, value: 'more' }] }
    },
    offset: 0,
    pluralType: 'cardinal'
  },
  { type: 0, value: ' people.' }
];

// The price is: {price, number, ::currency/EUR}
[
  { type: 0, value: 'The price is: ' },
  {
    type: 2,
    value: 'price',
    style: {
      type: 0,
      tokens: [{ stem: 'currency', options: ['EUR'] }],
      parsedOptions: { style: 'currency', currency: 'EUR' }
    }
  }
];

// Hello {name}! There are {count, plural, =0 {no} =1 {one} other {{count} more}} people.
[
  { type: 0, value: 'Hello ' },
  { type: 1, value: 'name' },
  { type: 0, value: '! There are ' },
  {
    type: 6,
    value: 'count',
    options: {
      '=0': { value: [{ type: 0, value: 'no' }] },
      '=1': { value: [{ type: 0, value: 'one' }] },
      other: {
        value: [{ type: 1, value: 'count' }, { type: 0, value: ' more' }]
      }
    },
    offset: 0,
    pluralType: 'cardinal'
  },
  { type: 0, value: ' people.' }
];

// Today is: {now, date, ::yyyyMMdd}
[
  { type: 0, value: 'Today is: ' },
  {
    type: 3,
    value: 'now',
    style: {
      type: 1,
      pattern: 'yyyyMMdd',
      parsedOptions: { year: 'numeric', month: '2-digit', day: '2-digit' }
    }
  }
];

/*
{
  gender,
  select,
  none {
    Nobody has replied yet.
  }
  male {
    {
      count,
      plural,
      =1 {One man is attending.}
      other {{count} men are attending.}
    }
  }
  female {
    {
      count,
      plural,
      =1 {One woman is attending.}
      other {{count} women are attending.}
    }
  }
  mixed {
    {
      maleCount,
      plural,
      =1 {One man}
      other {{maleCount} men}
    }
    and
    {
      femaleCount,
      plural,
      =1 {one woman }
      other {{femaleCount} women }
    }
    are attending.
  }
  other {}
}
*/
[
  {
    type: 5,
    value: 'gender',
    options: {
      none: { value: [{ type: 0, value: ' Nobody has replied yet. ' }] },
      male: {
        value: [
          { type: 0, value: ' ' },
          {
            type: 6,
            value: 'count',
            options: {
              '=1': {
                value: [{ type: 0, value: 'One man is attending.' }]
              },
              other: {
                value: [
                  { type: 1, value: 'count' },
                  { type: 0, value: ' men are attending.' }
                ]
              }
            },
            offset: 0,
            pluralType: 'cardinal'
          },
          { type: 0, value: ' ' }
        ]
      },
      female: {
        value: [
          { type: 0, value: ' ' },
          {
            type: 6,
            value: 'count',
            options: {
              '=1': {
                value: [{ type: 0, value: 'One woman is attending.' }]
              },
              other: {
                value: [
                  { type: 1, value: 'count' },
                  { type: 0, value: ' women are attending.' }
                ]
              }
            },
            offset: 0,
            pluralType: 'cardinal'
          },
          { type: 0, value: ' ' }
        ]
      },
      mixed: {
        value: [
          { type: 0, value: ' ' },
          {
            type: 6,
            value: 'maleCount',
            options: {
              '=1': { value: [{ type: 0, value: 'One man' }] },
              other: {
                value: [
                  { type: 1, value: 'maleCount' },
                  { type: 0, value: ' men' }
                ]
              }
            },
            offset: 0,
            pluralType: 'cardinal'
          },
          { type: 0, value: ' and ' },
          {
            type: 6,
            value: 'femaleCount',
            options: {
              '=1': { value: [{ type: 0, value: 'one woman ' }] },
              other: {
                value: [
                  { type: 1, value: 'femaleCount' },
                  { type: 0, value: ' women ' }
                ]
              }
            },
            offset: 0,
            pluralType: 'cardinal'
          },
          { type: 0, value: ' are attending. ' }
        ]
      },
      other: { value: [] }
    }
  }
];

// You are { POS, selectordinal, one { #st; } two { #nd; } few { #rd; } other { #th; }} in the queue.
[
  { type: 0, value: 'You are ' },
  {
    type: 6,
    value: 'POS',
    options: {
      one: {
        value: [
          { type: 0, value: ' ' },
          { type: 7 },
          { type: 0, value: 'st; ' }
        ]
      },
      two: {
        value: [
          { type: 0, value: ' ' },
          { type: 7 },
          { type: 0, value: 'nd; ' }
        ]
      },
      few: {
        value: [
          { type: 0, value: ' ' },
          { type: 7 },
          { type: 0, value: 'rd; ' }
        ]
      },
      other: {
        value: [
          { type: 0, value: ' ' },
          { type: 7 },
          { type: 0, value: 'th; ' }
        ]
      }
    },
    offset: 0,
    pluralType: 'ordinal'
  },
  { type: 0, value: ' in the queue.' }
];

// The time is {now, time}.
[
  { type: 0, value: 'The time is ' },
  { type: 4, value: 'now', style: null },
  { type: 0, value: '.' }
]

// Today is {now, date}.
[
  { type: 0, value: 'Today is ' },
  { type: 3, value: 'now', style: null },
  { type: 0, value: '.' }
]

// Everything is <b>awesome!</b>
[
  { type: 0, value: 'Everything is ' },
  { type: 8, value: 'b', children: [{ type: 0, value: 'awesome!' }] }
];
