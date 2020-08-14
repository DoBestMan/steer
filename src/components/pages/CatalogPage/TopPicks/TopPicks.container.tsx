import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogSummaryMeta } from '~/data/models/SiteCatalogSummaryMeta';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';

const TopPicks = dynamic(() => import('./TopPicks'));

interface Props {
  exploreMore: () => void;
  showLoadingInterstitial?: boolean;
  siteCatalogSummaryMeta: SiteCatalogSummaryMeta | null;
  siteCatalogSummaryTopPicksList: Array<SiteCatalogSummaryTopPickItem>;
  siteCatalogSummaryTopPicksMore: SiteCatalogSummaryTopPicksMore | null;
}

function TopPicksContainer({
  exploreMore,
  showLoadingInterstitial = false,
  siteCatalogSummaryMeta,
  siteCatalogSummaryTopPicksList,
  siteCatalogSummaryTopPicksMore,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  const { lockSearchStateToVehicle } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
  const { customerServiceNumber } = useSiteGlobalsContext();

  const totalResult = siteCatalogSummaryMeta
    ? siteCatalogSummaryMeta.totalResults
    : 0;

  const openSearch = useCallback(() => {
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  }, [lockSearchStateToVehicle, setIsSearchOpen]);

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
      showLoadingInterstitial={showLoadingInterstitial}
    />
  );
}

export default TopPicksContainer;
