import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { IconOrImage as IconOrImageProps } from '~/data/models/IconOrImage';

import styles from './InsightsItem.styles';

export interface InsightsItemProps {
  hasAction?: boolean;
  highlight?: boolean;
  icon?: IconOrImageProps;
  imageIcon?: string;
  imageIconAlt?: string;
  label: string;
}

function InsightsItem({
  highlight,
  icon,
  label,
  hasAction,
}: InsightsItemProps) {
  return (
    <div
      css={[
        styles.container,
        highlight && styles.containerHighlight,
        hasAction && styles.containerAction,
      ]}
    >
      <span css={styles.icon} aria-hidden>
        {icon && <IconOrImage {...icon} />}
      </span>
      <span css={styles.label}>{label}</span>
      {hasAction && <Icon name={ICONS.CHEVRON_RIGHT} css={styles.chevron} />}
    </div>
  );
}

export default InsightsItem;
