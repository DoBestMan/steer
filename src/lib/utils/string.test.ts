import { keysToCamel, numbersOnly } from './string';

describe('numbersOnly', () => {
  it('returns only the numbers of a string', () => {
    expect(numbersOnly('(123)-456 789 $%ABCabc')).toBe('123456789');
    expect(numbersOnly('123456789')).toBe('123456789');
  });

  it('returns empty if there is no number in the input string', () => {
    expect(numbersOnly('$%ABCabc')).toBe('');
  });
});

describe('keysToCamel', () => {
  it('returns a camel-cased object based on a kebab-cased one', () => {
    expect(
      keysToCamel({
        single: 0,
        'kebab-case': 1,
        camelCase: 2,
        snake_case: 3, // eslint-disable-line @typescript-eslint/camelcase
      }),
    ).toStrictEqual({
      single: 0,
      kebabCase: 1,
      camelCase: 2,
      snakeCase: 3,
    });
  });
});
