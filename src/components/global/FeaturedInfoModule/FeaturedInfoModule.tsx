import { ReactType } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
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
  icon?: IconType;
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
  title,
}: FeaturedInfoModuleProps) {
  const Header = headerAs;
  return (
    <div css={styles.container}>
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
