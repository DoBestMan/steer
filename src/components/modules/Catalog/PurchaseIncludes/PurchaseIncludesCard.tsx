import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import { LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import styles from './PurchaseIncludesCard.styles';

export interface Props {
  description: string;
  icon: IconType;
  linkLabel: string;
  linkUrl: string;
  title: string;
}

function PurchaseIncludesCard({
  description,
  icon,
  linkLabel,
  linkUrl,
  title,
}: Props) {
  return (
    <div css={styles.cardContainer}>
      <Icon name={icon} css={styles.cardIcon} />
      <div>
        <h2 css={styles.cardTitle}>{title}</h2>
        <p css={typography.bodyCopy}>{description}</p>
      </div>
      <Link
        as="button"
        href={linkUrl}
        theme={LINK_THEME.LIGHT}
        css={styles.cardLink}
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export default PurchaseIncludesCard;
