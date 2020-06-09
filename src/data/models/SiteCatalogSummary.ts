import { SiteCatalogSummaryBuildIn } from './SiteCatalogSummaryBuildIn';
import { SiteCatalogSummaryMeta } from './SiteCatalogSummaryMeta';
import { SiteCatalogSummaryPrompt } from './SiteCatalogSummaryPrompt';
import { SiteCatalogSummaryRecirculation } from './SiteCatalogSummaryRecirculation';
import { SiteCatalogSummaryTopPicksMore } from './SiteCatalogSummaryTopPicksMore';
import { TopPickItem } from './TopPickItem';

export interface SiteCatalogSummary {
  siteCatalogSummaryBuildIn: SiteCatalogSummaryBuildIn | null;
  siteCatalogSummaryMeta: SiteCatalogSummaryMeta | null;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
  siteCatalogSummaryRecirculation: SiteCatalogSummaryRecirculation | null;
  siteCatalogSummaryTopPicksList: TopPickItem[];
  siteCatalogSummaryTopPicksMore: SiteCatalogSummaryTopPicksMore | null;
}
