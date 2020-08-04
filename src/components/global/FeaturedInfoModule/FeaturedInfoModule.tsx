import { ReactType } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { isSiteIcon, SiteIcon } from '~/data/models/SiteIcon';
import { CSSStylesProp, LINK_TYPE, THEME } from '~/lib/constants';

import styles from './FeaturedInfoModule.styles';

export interface FeaturedInfoModuleProps {
  action?: {
    as: LINK_TYPE;
    href?: string;
    onClick?: () => void;
    text: string;
  };
  copy: string;
  customCopyStyles?: CSSStylesProp;
  customLinkStyles?: CSSStylesProp;
  customTitleStyles?: CSSStylesProp;
  dataVendor?: string;
  featureDescription?: string;
  headerAs?: ReactType;
  icon?: IconType | SiteIcon;
  isTwoColumnItems?: boolean;
  title: string;
}

function FeaturedInfoModule({
  action,
  copy,
  customCopyStyles,
  customLinkStyles,
  customTitleStyles,
  dataVendor,
  featureDescription,
  headerAs = 'div',
  icon,
  isTwoColumnItems,
  title,
}: FeaturedInfoModuleProps) {
  const Header = headerAs;
  const containerStyle = isTwoColumnItems
    ? [styles.container, styles.twoColumnSpacing]
    : styles.container;

  if (typeof icon !== 'string' && icon && isSiteIcon(icon)) {
    icon = icon.svgId;
  }

  return (
    <div css={containerStyle}>
      {icon && <Icon name={icon} css={styles.icon} />}

      {featureDescription && (
        <p css={styles.featureDescription}>{featureDescription}</p>
      )}

      <Header css={[styles.title, customTitleStyles]}>
        <Markdown renderers={{ paragraph: 'span' }}>{title}</Markdown>
      </Header>

      <div css={[styles.copy, customCopyStyles]}>
        <Markdown>{copy}</Markdown>
      </div>

      {action && (
        <Link
          css={[styles.action, customLinkStyles]}
          {...action}
          theme={THEME.LIGHT}
          data-vendor={dataVendor}
        >
          {action.text}
        </Link>
      )}
    </div>
  );
}

export default FeaturedInfoModule;
