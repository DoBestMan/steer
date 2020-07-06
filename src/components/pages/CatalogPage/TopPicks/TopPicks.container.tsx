import { useEffect } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogSummaryMeta } from '~/data/models/SiteCatalogSummaryMeta';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';

import TopPicks from './TopPicks';

interface Props {
  exploreMore: () => void;
  setStage(stage: STAGES): void;
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
  const { setShowCatalogGrid } = useCatalogPageContext();
  const { setIsSearchOpen } = useSearchContext();
  const { customerServiceNumber } = useSiteGlobalsContext();

  const totalResult = siteCatalogSummaryMeta
    ? siteCatalogSummaryMeta.totalResults
    : 0;

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  // show catalog grid anyway
  useEffect(() => {
    setShowCatalogGrid(true);
  });

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
