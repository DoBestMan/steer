import { useTheme } from 'emotion-theming';

import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from './Filters/Filter.types';
import FilterButtonsCarousel from './Filters/FilterButtonsCarousel';
import { getGroupedFilters } from './Filters/Filters.utils';
import SubFilters from './Filters/SubFilters/SubFilters';
import { DATA_COMPONENT_LABEL } from './Header.constants';
import styles from './Header.styles';
import HeaderInfo from './HeaderInfo/HeaderInfo';

interface Props {
  hasTopPicks: boolean;
  isInternal?: boolean;
  location: string;
  siteCatalogProducts: SiteCatalogProducts;
  sizeList?: string[];
}

export default function Header({
  hasTopPicks,
  isInternal = false,
  siteCatalogProducts,
  ...rest
}: Props) {
  const { siteCatalogFilters: catalogFilters } = siteCatalogProducts;
  const { header } = useTheme();
  const { greaterThan, isLoading } = useBreakpoints();
  const priceFilter = catalogFilters.filtersList.find(
    (f): f is SiteCatalogFilterRange =>
      f.type === FilterContentTypes.SiteCatalogFilterRange && f.id === 'price',
  );
  const filters = catalogFilters.filtersList.filter(
    (f: CatalogFilterTypes) => f !== priceFilter,
  );
  const groupedFilters = greaterThan.M && getGroupedFilters(filters);
  const filtersToMap = groupedFilters ? groupedFilters.otherFilters : filters;

  return (
    <>
      <div css={[styles.root, !hasTopPicks && styles.navOffset]}>
        {/* For opacity animation only (see <CatalogGrid>) */}
        <div css={[styles.headerContainer, header.background]}></div>
        {/* "data-component" used in <CatalogGrid> */}
        <div data-component={DATA_COMPONENT_LABEL}>
          <HeaderInfo
            isInternal={isInternal}
            hasTopPicks={hasTopPicks}
            title={siteCatalogProducts.siteCatalogProductsMeta.title}
            {...rest}
          />
          <p css={[styles.filterLabel, header.text]}>
            {ui('catalog.header.filterLabel')}:
          </p>
          {!isLoading && (
            <FilterButtonsCarousel
              popularFilters={
                groupedFilters ? groupedFilters.popularFilters : []
              }
              filters={filtersToMap}
            />
          )}
        </div>
      </div>
      <SubFilters
        resultsCount={
          siteCatalogProducts.listResultMetadata.pagination?.total || 0
        }
        priceFilter={priceFilter}
        sortList={catalogFilters.sortList}
      />
    </>
  );
}
