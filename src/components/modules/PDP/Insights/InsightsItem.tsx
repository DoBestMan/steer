import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Image from '~/components/global/Image/Image';

import styles from './InsightsItem.styles';

export interface Props {
  hasAction?: boolean;
  highlight?: boolean;
  icon?: IconType;
  imageIcon?: string;
  imageIconAlt?: string;
  label: string;
}

function InsightsItem({
  highlight,
  icon,
  imageIcon,
  imageIconAlt,
  label,
  hasAction,
}: Props) {
  return (
    <div
      css={[
        styles.container,
        highlight && styles.containerHighlight,
        hasAction && styles.containerAction,
      ]}
    >
      <span css={styles.icon}>
        {icon ? (
          <Icon name={icon} aria-hidden />
        ) : (
          imageIcon && (
            <Image
              src={imageIcon}
              altText={imageIconAlt || label}
              aria-hidden
            />
          )
        )}
      </span>
      <span css={styles.label}>{label}</span>
      {hasAction && <Icon name={ICONS.CHEVRON_RIGHT} css={styles.chevron} />}
    </div>
  );
}

export default InsightsItem;
