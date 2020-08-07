import isStrictEqual from 'fast-deep-equal';

import { SiteCatalogFilter } from '~/data/models/SiteCatalogFilter';
import { SiteCatalogFilterList } from '~/data/models/SiteCatalogFilterList';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import {
  filterSort,
  mockDupeMultipleValSelected,
  mockDupeSelected,
  mockItem,
  mockList,
  mockListSelected,
  mockMultipleValSelected,
  mockRange,
  mockSiteCatalogFilters,
  mockToggle,
  mockUniqueSelected,
  warrantyFilter,
} from './Filters.mocks';
import {
  getAppliedCount,
  getFilterLabel,
  getGroupedFilters,
  getInitialFiltersState,
  getValueKeys,
  hasActiveValue,
  strictEqualsFilterValue,
} from './Filters.utils';

const toggleFilters = [
  { type: FilterContentTypes.SiteCatalogFilterToggle },
  { type: FilterContentTypes.SiteCatalogFilterToggle },
];

const otherFilters = [
  { type: FilterContentTypes.SiteCatalogFilterRange },
  { type: FilterContentTypes.SiteCatalogFilterList },
  { type: FilterContentTypes.SiteCatalogFilterList },
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
        (type) => type === FilterContentTypes.SiteCatalogFilterToggle,
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
        otherFilterTypes.includes(FilterContentTypes.SiteCatalogFilterToggle),
      ).toBe(false);
    });
  });

  describe('getFilterCount', () => {
    it('returns a count of applied filters', () => {
      expect(getAppliedCount(mockListSelected)).toEqual(1);
      expect(getAppliedCount(mockList)).toEqual(0);
      expect(getAppliedCount(mockUniqueSelected)).toEqual(2);
      expect(getAppliedCount(mockMultipleValSelected)).toEqual(2);
      expect(getAppliedCount(mockDupeMultipleValSelected)).toEqual(1);
    });

    it('does not count duplicates', () => {
      expect(getAppliedCount(mockDupeSelected)).toEqual(1);
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

    it('does not append identical filters', () => {
      const mockFilterList = ([
        {
          type: FilterContentTypes.SiteCatalogFilterToggle,
          item: {
            state: 'Selected',
            value: {
              category: 'allSeason',
            },
          },
        },
      ] as unknown) as SiteCatalogFilter[];

      const { initialState } = getInitialFiltersState(
        mockFilterList,
        filterSort,
      );

      expect(initialState.category).toEqual('allSeason');

      const mockFilterListMultiple = ([
        {
          type: FilterContentTypes.SiteCatalogFilterToggle,
          item: {
            state: 'Selected',
            value: {
              category: 'allSeason,winter',
            },
          },
        },
      ] as unknown) as SiteCatalogFilter[];

      const { initialState: initialStateMultiple } = getInitialFiltersState(
        mockFilterListMultiple,
        filterSort,
      );

      expect(initialStateMultiple.category).toEqual('allSeason,winter');
    });

    it('does not add identical filters from other groups that exist in state (unique to list)', () => {
      // first group has active val, second group does not
      const mockListDupe = {
        ...mockList,
        filterGroups: [
          ...mockList.filterGroups,
          {
            items: [
              {
                value: {
                  state: 'Selected',
                  foo: 'bar',
                },
              },
            ],
          },
          {
            items: [
              {
                state: 'Selected',
                value: {
                  foo: 'baz',
                },
              },
            ],
          },
          {
            items: [
              {
                state: 'Selected',
                value: { foo: 'bar' }, // repeat
              },
            ],
          },
        ],
      } as SiteCatalogFilterList;

      const { initialState } = getInitialFiltersState([mockListDupe], []);

      expect(initialState).toHaveProperty('foo', 'baz,bar');
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

    it('handles min/max on range types', () => {
      const mockFilterRange = [
        { ...warrantyFilter, currentMinValue: 0, currentMaxValue: 20000 },
      ] as SiteCatalogFilter[];

      const { initialState } = getInitialFiltersState(
        mockFilterRange,
        filterSort,
      );

      expect(initialState).toHaveProperty('warranty', '0,20000');

      const mockFilterRangeNull = [
        { ...warrantyFilter, currentMinValue: null, currentMaxValue: null },
      ] as SiteCatalogFilter[];

      const { initialState: initialStateNull } = getInitialFiltersState(
        mockFilterRangeNull,
        filterSort,
      );

      expect(initialStateNull).not.toHaveProperty('warranty');

      const mockFilterRangeSingle = [
        { ...warrantyFilter, currentMinValue: null, currentMaxValue: 25000 },
      ] as SiteCatalogFilter[];

      const { initialState: initialStateSingle } = getInitialFiltersState(
        mockFilterRangeSingle,
        filterSort,
      );

      expect(initialStateSingle).toHaveProperty('warranty', '0,25000');
    });

    describe('isStrictEqual', () => {
      it('checks if all filter values equals corresponding filter state key', () => {
        expect(
          isStrictEqual({ foo: 'bar', bar: 'baz' }, { foo: 'bar', bar: 'baz' }),
        ).toBe(true);
        expect(isStrictEqual({ foo: 'bar', bar: 'baz' }, { foo: 'bar' })).toBe(
          false,
        );
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

        it('does not update isActive value in list if already true', () => {
          const mockState = {
            foo: 'bar,baz',
            bar: 'qux',
            range: '0,60',
          };

          // first group has active val, second group does not
          const mockListDupe = {
            ...mockList,
            filterGroups: [
              ...mockList.filterGroups,
              {
                items: [
                  {
                    value: { qux: 'baz' },
                  },
                ],
              },
            ],
          } as SiteCatalogFilterList;

          expect(hasActiveValue(mockListDupe, mockState)).toBe(true);
        });
      });

      describe('strictEqualsFilterValue', () => {
        it('checks if all filter values equals corresponding filter state key', () => {
          expect(
            strictEqualsFilterValue(
              { foo: 'bar', bar: 'baz' },
              { foo: 'bar', bar: 'baz' },
            ),
          ).toBe(true);
          expect(
            strictEqualsFilterValue({ foo: 'bar', bar: 'baz' }, { foo: 'bar' }),
          ).toBe(false);
        });
      });

      describe('getValueKeys', () => {
        it('returns a deduped list of value keys from a filter', () => {
          const mockPopularFilters = ({
            type: FilterContentTypes.SiteCatalogFilterPopular,
            items: [
              {
                type: FilterContentTypes.SiteCatalogFilterToggle,
                item: { value: { foo: 'bar' } },
              },
              {
                type: FilterContentTypes.SiteCatalogFilterToggle,
                item: { value: { foo: 'quz' } },
              },
              {
                type: FilterContentTypes.SiteCatalogFilterToggle,
                item: { value: { qux: 'baz' } },
              },
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
