import dynamic from 'next/dynamic';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogSummaryMeta } from '~/data/models/SiteCatalogSummaryMeta';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';

const TopPicks = dynamic(() => import('./TopPicks'));

interface Props {
  exploreMore: () => void;
  siteCatalogSummaryMeta: SiteCatalogSummaryMeta | null;
  siteCatalogSummaryTopPicksList: Array<SiteCatalogSummaryTopPickItem>;
  siteCatalogSummaryTopPicksMore: SiteCatalogSummaryTopPicksMore | null;
}

function TopPicksContainer({
  exploreMore,
  siteCatalogSummaryMeta,
  siteCatalogSummaryTopPicksList,
  siteCatalogSummaryTopPicksMore,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  const { lockSearchStateToVehicle, setIsSearchOpen } = useSearchContext();
  const { customerServiceNumber } = useSiteGlobalsContext();

  const totalResult = siteCatalogSummaryMeta
    ? siteCatalogSummaryMeta.totalResults
    : 0;

  const openSearch = () => {
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  };

  if (siteCatalogSummaryTopPicksList.length === 0) {
    return null;
  }

  return (
    <TopPicks
      customerServiceNumber={customerServiceNumber}
      exploreMore={exploreMore}
      location={locationString}
      picks={siteCatalogSummaryTopPicksList}
      totalResult={totalResult}
      viewMoreData={siteCatalogSummaryTopPicksMore}
      openSearch={openSearch}
    />
  );
}

export default TopPicksContainer;
