import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { IconOrImage as IconOrImageProps } from '~/data/models/IconOrImage';

import styles from './InsightsItem.styles';

export interface InsightsItemProps {
  hasAction?: boolean;
  highlight?: boolean;
  icon?: IconOrImageProps;
  imageIcon?: string;
  imageIconAlt?: string;
  label: string;
  ssr?: boolean;
}

function InsightsItem({
  highlight,
  icon,
  label,
  hasAction,
  ssr = false,
}: InsightsItemProps) {
  return (
    <div
      css={[
        styles.container,
        highlight && styles.containerHighlight,
        hasAction && styles.containerAction,
      ]}
    >
      <span
        css={
          icon && icon.type == 'SiteImage' ? styles.vehicleIcon : styles.icon
        }
        aria-hidden
      >
        {icon && <IconOrImage {...icon} ssr={ssr} />}
      </span>
      <Markdown renderers={{ paragraph: 'span' }} css={styles.label}>
        {label}
      </Markdown>
      {hasAction && (
        <Icon
          name={ICONS.CHEVRON_RIGHT}
          css={styles.chevron}
          ssr={ssr}
          ssWidth={22}
        />
      )}
    </div>
  );
}

export default InsightsItem;
