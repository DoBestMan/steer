import { SiteCatalogSummaryBuildIn } from './SiteCatalogSummaryBuildIn';
import { SiteCatalogSummaryMeta } from './SiteCatalogSummaryMeta';
import { SiteCatalogSummaryPrompt } from './SiteCatalogSummaryPrompt';
import { SiteCatalogSummaryRecirculation } from './SiteCatalogSummaryRecirculation';
import { SiteCatalogSummaryTopPickItem } from './SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from './SiteCatalogSummaryTopPicksMore';

export interface SiteCatalogSummary {
  siteCatalogSummaryBuildIn: SiteCatalogSummaryBuildIn | null;
  siteCatalogSummaryMeta: SiteCatalogSummaryMeta | null;
  siteCatalogSummaryPrompt: SiteCatalogSummaryPrompt | null;
  siteCatalogSummaryRecirculation: SiteCatalogSummaryRecirculation | null;
  siteCatalogSummaryTopPicksList: Array<SiteCatalogSummaryTopPickItem>;
  siteCatalogSummaryTopPicksMore: SiteCatalogSummaryTopPicksMore | null;
}
