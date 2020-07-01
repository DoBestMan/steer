import {
  SiteCatalogFilter,
  SiteCatalogFilterList,
  SiteCatalogFilterTypeEnum,
} from '~/data/models/SiteCatalogFilters';

import { CatalogFilterTypes } from './Filter.types';
import {
  filterSort,
  mockItem,
  mockList,
  mockRange,
  mockSiteCatalogFilters,
  mockToggle,
  warrantyFilter,
} from './Filters.mocks';
import {
  getFilterLabel,
  getGroupedFilters,
  getInitialFiltersState,
  getValueKeys,
  hasActiveValue,
  strictEqualsValue,
} from './Filters.utils';

const toggleFilters = [
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle },
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle },
];

const otherFilters = [
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterRange },
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterList },
  { type: SiteCatalogFilterTypeEnum.SiteCatalogFilterList },
];

describe('Filters.utils', () => {
  describe('getGroupedFilters', () => {
    it('groups toggles into popularFilters category', () => {
      const groupedFilters = getGroupedFilters([
        ...toggleFilters,
        ...otherFilters,
      ] as CatalogFilterTypes[]);

      const popularFilterTypes = groupedFilters.popularFilters.map(
        (filter) => filter.type,
      );
      const filteredTypes = popularFilterTypes.filter(
        (type) => type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle,
      );

      expect(groupedFilters.popularFilters).toHaveLength(2);
      expect(filteredTypes).toHaveLength(2);
    });

    it('groups non toggle filters into otherFilters', () => {
      const groupedFilters = getGroupedFilters([
        ...toggleFilters,
        ...otherFilters,
      ] as CatalogFilterTypes[]);

      const otherFilterTypes = groupedFilters.otherFilters.map(
        (filter) => filter.type,
      );

      expect(groupedFilters.popularFilters).toHaveLength(2);
      expect(groupedFilters.otherFilters).toHaveLength(3);
      expect(
        otherFilterTypes.includes(
          SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle,
        ),
      ).toBe(false);
    });
  });

  describe('getFilterLabel', () => {
    it('returns a label for a toggle filter', () => {
      expect(getFilterLabel(mockToggle)).toEqual('Toggle Label');
    });

    // other filters may have a header field that contains the title
    it('returns a label for non-toggle filters', () => {
      expect(getFilterLabel(mockList)).toEqual('List Label');

      const mockRange = {
        header: null,
      } as SiteCatalogFilterList;

      expect(getFilterLabel(mockRange)).toEqual('');
    });
  });

  describe('getInitialFiltersState', () => {
    it('returns a map of filters that have the correlated active state field', () => {
      const mockInitialState = {
        brand: 'goodyear,pirelli',
        sort: 'price',
        order: 'asc',
        warranty: '5000,20000',
      };
      const mockFilterList = [
        ...mockSiteCatalogFilters,
        { ...warrantyFilter, currentMinValue: 5000, currentMaxValue: 20000 },
      ] as SiteCatalogFilter[];

      const { initialState } = getInitialFiltersState(
        mockFilterList,
        filterSort,
      );

      expect(initialState).toEqual(mockInitialState);
    });

    it('checks the status of toggle filters to determine if the popular filters button is active', () => {
      const {
        isPopularActive: mockPopularActiveFalse,
      } = getInitialFiltersState(
        mockSiteCatalogFilters as SiteCatalogFilter[],
        filterSort,
      );

      expect(mockPopularActiveFalse).toEqual(false);

      const { isPopularActive: mockPopularActiveTrue } = getInitialFiltersState(
        [...mockSiteCatalogFilters, mockToggle] as SiteCatalogFilter[],
        filterSort,
      );

      expect(mockPopularActiveTrue).toEqual(true);
    });

    describe('strictEqualsValue', () => {
      it('checks if all filter values strictly equals corresponding filter state key', () => {
        expect(
          strictEqualsValue(
            { foo: 'bar', bar: 'baz' },
            { foo: 'bar', bar: 'baz' },
          ),
        ).toBe(true);
        expect(
          strictEqualsValue({ foo: 'bar', bar: 'baz' }, { foo: 'bar' }),
        ).toBe(false);
      });

      describe('hasActiveValue', () => {
        it('checks if the state map contains one of the available filter values', () => {
          const mockState = {
            foo: 'bar,baz',
            bar: 'qux',
            range: '0,60',
          };

          // filter item
          expect(hasActiveValue(mockItem, mockState)).toBe(true);
          // toggle filter
          expect(hasActiveValue(mockToggle, mockState)).toBe(true);
          // list filter
          expect(hasActiveValue(mockList, mockState)).toBe(true);
          // range filter
          expect(hasActiveValue(mockRange, mockState)).toBe(true);
        });
      });

      describe('getValueKeys', () => {
        it('returns a deduped list of value keys from a filter', () => {
          const mockPopularFilters = ({
            type: 'SiteCatalogFilterPopular',
            items: [
              { item: { value: { foo: 'bar' } } },
              { item: { value: { foo: 'quz' } } },
              { item: { value: { qux: 'baz' } } },
            ],
          } as unknown) as CatalogFilterTypes;

          // toggle filter
          expect(getValueKeys(mockToggle)).toEqual(['foo']);
          // list filter
          expect(getValueKeys(mockList)).toEqual(['foo', 'baz']);
          // range filter
          expect(getValueKeys(mockRange)).toEqual(['range']);
          // popular filters
          expect(getValueKeys(mockPopularFilters)).toEqual(['foo', 'qux']);
        });
      });
    });
  });
});
