import { numbersOnly } from './string';

describe('numbersOnly', () => {
  it('returns only the numbers of a string', () => {
    expect(numbersOnly('(123)-456 789 $%ABCabc')).toBe('123456789');
    expect(numbersOnly('123456789')).toBe('123456789');
  });

  it('returns empty if there is no number in the input string', () => {
    expect(numbersOnly('$%ABCabc')).toBe('');
  });
});
