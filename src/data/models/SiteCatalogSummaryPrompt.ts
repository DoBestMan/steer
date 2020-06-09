import { SiteLink } from './SiteLink';

interface CTA {
  label: string;
  link: SiteLink | null;
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
