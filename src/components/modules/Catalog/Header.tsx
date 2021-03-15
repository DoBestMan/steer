import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import { FilterContentTypes } from './Filters/Filter.types';
import FilterButtonsCarousel from './Filters/FilterButtonsCarousel';
import { getGroupedFilters } from './Filters/Filters.utils';
import SubFilters from './Filters/SubFilters/SubFilters';
import { DATA_COMPONENT_LABEL } from './Header.constants';
import styles from './Header.styles';
import HeaderBackground from './HeaderBackground';
import HeaderInfo from './HeaderInfo/HeaderInfo';
import HeaderStickyBar from './HeaderStickyBar/HeaderStickyBar';

interface Props {
  hasTopPicks: boolean;
  isInternal?: boolean;
  location: string;
  showingResult: number;
  siteCatalogProducts: SiteCatalogProducts;
  sizeList?: string[];
}

export default function Header({
  hasTopPicks,
  showingResult,
  isInternal = false,
  siteCatalogProducts,
  ...rest
}: Props) {
  const { siteCatalogFilters: catalogFilters } = siteCatalogProducts;
  const { greaterThan, isLoading } = useBreakpoints();
  const hasPriceFilter = !!catalogFilters.filtersList.find(
    (f): f is SiteCatalogFilterRange =>
      f.type === FilterContentTypes.SiteCatalogFilterRange && f.id === 'price',
  );
  const filters = catalogFilters.filtersList;
  const groupedFilters = greaterThan.M && getGroupedFilters(filters);
  const filtersToMap = groupedFilters ? groupedFilters.otherFilters : filters;

  return (
    <>
      <div css={[styles.root, !hasTopPicks && styles.navOffset]}>
        {/* For opacity animation only (see <CatalogGrid>) */}
        <HeaderBackground />
        {/* "data-component" used in <CatalogGrid> */}
        <div data-component={DATA_COMPONENT_LABEL}>
          <HeaderInfo
            isInternal={isInternal}
            title={siteCatalogProducts.siteCatalogProductsMeta.title}
            {...rest}
          />
        </div>
      </div>
      <HeaderStickyBar>
        {!isLoading && (
          <FilterButtonsCarousel
            hasPriceFilter={hasPriceFilter}
            popularFilters={groupedFilters ? groupedFilters.popularFilters : []}
            filters={filtersToMap}
          />
        )}
      </HeaderStickyBar>
      <SubFilters
        showingResult={showingResult}
        resultsCount={
          siteCatalogProducts.listResultMetadata.pagination?.total || 0
        }
        sortList={catalogFilters.sortList}
      />
    </>
  );
}
