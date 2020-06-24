import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';

import Header from './Header';

interface Props {
  hasTopPicks: boolean;
  isAdvancedView: boolean;
  isInternal?: boolean;
  sizeList?: string[];
  toggleView: () => void;
}

function onSearchWithFilters(_filters: object) {
  // TODO: run search with new filters
}

const titlePlaceholder = (
  <>
    232 tires fit your
    <br />
    Lamborghini Aventador Roadster 2018
  </>
);

export default function HeaderContainer({
  hasTopPicks,
  isAdvancedView,
  sizeList,
  toggleView,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  return (
    <FiltersContextProvider onApplyFilters={onSearchWithFilters}>
      <Header
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
