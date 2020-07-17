import { SiteQueryParams } from './SiteQueryParams';

interface CTA {
  label: string;
  siteQueryParams: SiteQueryParams | null;
}

interface InfoLink {
  contentId: string;
  label: string;
}

export interface SiteCatalogSummaryPrompt {
  body: string | null;
  ctaList: CTA[] | null;
  infoLink: InfoLink | null;
  mustShow: boolean;
  title: string;
}
