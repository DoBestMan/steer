import Link from '~/components/global/Link/Link';
import { SiteLink } from '~/data/models/SiteLink';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { ICONS } from '../Icon/Icon.constants';
import styles from './PromotionCard.styles';

export interface PromotionLinksProps {
  catalogParams?: Record<string, string>;
  eyebrow?: string | null;
  handlePromotionClick?: (
    params: Record<string, string>,
    label: string,
  ) => void;
  handleReferAFriendClick?: () => void;
  label: string;
  link?: SiteLink;
  type?: string;
}

export function SiteCTAOpenCatalog({
  label = ui('deals.viewTirePromotionAction'),
  catalogParams,
  handlePromotionClick,
  eyebrow,
}: PromotionLinksProps) {
  const onPromotionClick = () => {
    if (handlePromotionClick && catalogParams) {
      handlePromotionClick(catalogParams, eyebrow || '');
    }
  };
  return (
    <Link
      as="button"
      icon={ICONS.CHEVRON_RIGHT}
      theme={THEME.LIGHT}
      onClick={onPromotionClick}
      css={styles.links}
    >
      {label}
    </Link>
  );
}

export function SiteCTAReferFriend({
  label = ui('deals.referAFriendAction'),
  handleReferAFriendClick,
}: PromotionLinksProps) {
  return (
    <Link
      as="button"
      icon={ICONS.CHEVRON_RIGHT}
      theme={THEME.LIGHT}
      onClick={handleReferAFriendClick}
      css={styles.links}
    >
      {label}
    </Link>
  );
}

export function SiteLinkWithLabel({ label, link }: PromotionLinksProps) {
  return (
    <Link
      {...link}
      icon={ICONS.CHEVRON_RIGHT}
      theme={THEME.LIGHT}
      css={styles.links}
    >
      {label}
    </Link>
  );
}
