import { getDiameterCategory } from './CatalogPage.utils';

describe('getDiameterCategory', () => {
  it('returns content on either side of the second dash', () => {
    expect(getDiameterCategory('12-inch-winter-tires')).toStrictEqual({
      category: 'winter-tires',
      diameter: '12-inch',
    });
    expect(
      getDiameterCategory('14-inch-winter-tires-and-more-words'),
    ).toStrictEqual({
      category: 'winter-tires-and-more-words',
      diameter: '14-inch',
    });
  });

  it('does not handle classic tire size format', () => {
    expect(getDiameterCategory('p195-45r16')).toStrictEqual({
      category: undefined,
      diameter: undefined,
    });
  });
});
