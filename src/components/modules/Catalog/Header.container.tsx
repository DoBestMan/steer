import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';

import Header from './Header';

interface Props {
  handleUpdateResults?: (filters: Record<string, string>) => void;
  hasTopPicks: boolean;
  isAdvancedView: boolean;
  isInternal?: boolean;
  siteCatalogFilters: any;
  sizeList?: string[];
  toggleView: () => void;
}

const titlePlaceholder = (
  <>
    232 tires fit your
    <br />
    Lamborghini Aventador Roadster 2018
  </>
);

export default function HeaderContainer({
  handleUpdateResults,
  hasTopPicks,
  isAdvancedView,
  siteCatalogFilters,
  sizeList,
  toggleView,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  return (
    <FiltersContextProvider
      siteCatalogFilters={siteCatalogFilters}
      onApplyFilters={handleUpdateResults}
    >
      <Header
        siteCatalogFilters={siteCatalogFilters}
        hasTopPicks={hasTopPicks}
        isAdvancedView={isAdvancedView}
        isInternal={false}
        title={titlePlaceholder}
        sizeList={sizeList}
        resultsCount={232}
        onToggleView={toggleView}
        location={locationString}
      />
    </FiltersContextProvider>
  );
}
