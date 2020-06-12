import { Cars } from './Car.enums';
import { getScaleVector } from './Car.utils';

describe('getScaleVector', () => {
  it('returns correct scale vector for large vehicle transformation', () => {
    const sedanId = Cars['car--sedan'];
    const sedanVector = getScaleVector(sedanId, 'S');

    expect(sedanVector).toEqual(7.0012328220637);
  });
});
