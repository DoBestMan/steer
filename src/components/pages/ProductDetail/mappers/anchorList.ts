import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { TechnicalSpecsProps } from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { ui } from '~/lib/utils/ui-dictionary';

export const ANCHORS = {
  DESCRIPTION_ANCHOR: 'SiteProductLine',
  INSIGHTS_ANCHOR: 'SiteProductInsights',
  INSTALLATION_ANCHOR: 'Installation',
  REVIEWS_ANCHOR: 'SiteProductReviews',
  TECH_SPECS_ANCHOR: 'SiteProductSpecs',
};

export const DEFAULT_ANCHOR_LINKS = [
  {
    anchor: ANCHORS.INSIGHTS_ANCHOR,
    label: ui('pdp.anchorBar.insights'),
    offset: -60,
  },
  {
    anchor: ANCHORS.INSTALLATION_ANCHOR,
    label: ui('pdp.anchorBar.installation'),
  },
  {
    anchor: ANCHORS.REVIEWS_ANCHOR,
    label: ui('pdp.anchorBar.reviews'),
  },
  {
    anchor: ANCHORS.DESCRIPTION_ANCHOR,
    label: ui('pdp.anchorBar.description'),
  },
  {
    anchor: ANCHORS.TECH_SPECS_ANCHOR,
    label: ui('pdp.anchorBar.specs'),
    offset: -20,
  },
];

export const PAID_ANCHOR_LINKS = [
  {
    anchor: ANCHORS.INSIGHTS_ANCHOR,
    label: ui('pdp.anchorBar.insights'),
    offset: -60,
  },
  {
    anchor: ANCHORS.DESCRIPTION_ANCHOR,
    label: ui('pdp.anchorBar.description'),
    offset: -60,
  },
  {
    anchor: ANCHORS.TECH_SPECS_ANCHOR,
    label: ui('pdp.anchorBar.specs'),
    offset: -20,
  },
  {
    anchor: ANCHORS.INSTALLATION_ANCHOR,
    label: ui('pdp.anchorBar.installation'),
  },
  {
    anchor: ANCHORS.REVIEWS_ANCHOR,
    label: ui('pdp.anchorBar.reviews'),
  },
];

export interface Anchor {
  anchor: string;
  label: string;
  offset?: number;
}

export interface Params {
  insights: Omit<InsightsProps, 'handleChangeLocation'> | null;
  installation: InstallationProps | null;
  isPLA: boolean;
  technicalSpecs: TechnicalSpecsProps | null;
}

export function mapDataToAnchorList({
  insights,
  installation,
  isPLA,
  technicalSpecs,
}: Params): Anchor[] {
  let anchorLinks = isPLA ? PAID_ANCHOR_LINKS : DEFAULT_ANCHOR_LINKS;

  // Filter out various anchor links if the data isn't present.
  if (!insights) {
    anchorLinks = anchorLinks.filter(
      (anchorLink) => anchorLink.anchor !== ANCHORS.INSIGHTS_ANCHOR,
    );
  }

  if (!technicalSpecs) {
    anchorLinks = anchorLinks.filter(
      (anchorLink) =>
        anchorLink.anchor !== ANCHORS.DESCRIPTION_ANCHOR &&
        anchorLink.anchor !== ANCHORS.TECH_SPECS_ANCHOR,
    );
  }

  if (!installation) {
    anchorLinks = anchorLinks.filter(
      (anchorLink) => anchorLink.anchor !== ANCHORS.INSTALLATION_ANCHOR,
    );
  }

  return anchorLinks;
}
