import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';

import { typography } from '~/styles/typography.styles';

import { filterRange, filterSort } from '../Filters.mocks';
import SubFilters from './SubFilters';

export default {
  component: SubFiltersWithKnobs,
  title: 'Catalog/Header/Sub Filters',
};

export function SubFiltersWithKnobs() {
  const sortOptions = filterSort.items.map((item) => item.title);
  const min = number('Price min', 49);
  const max = number('Price max', 349);
  return (
    <>
      <SubFilters
        {...{
          activeFilters: [],
          activeSort: select('Sort By', sortOptions, filterSort.items[0].title),
          onClose: action('Close filter select'),
          onOpen: () => action('Open filter select'),
          priceFilter: { ...filterRange, minValue: min, maxValue: max },
          resultsCount: number('Results count', 232),
          selectingFilter: '',
          sortFilter: filterSort,
          toggleFilter: () => action('Apply filter'),
        }}
      />
      <p css={[typography.smallCopy, { paddingTop: 100 }]}>
        *Note for QA: knob for price min/max will not work for range slider,
        only test this on S/M breakpoints
      </p>
    </>
  );
}
