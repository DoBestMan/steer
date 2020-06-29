import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { CSSStyles, LINK_TYPE, THEME } from '~/lib/constants';

import styles from './FeaturedInfoModule.styles';

export interface FeaturedInfoModuleProps {
  action?: {
    as: LINK_TYPE;
    href?: string;
    onClick?: () => void;
    text: string;
  };
  copy: string;
  customCopyStyles?: CSSStyles;
  customTitleStyles?: CSSStyles;
  dataVendor?: string;
  featureDescription?: string;
  icon?: IconType;
  title: string;
}

function FeaturedInfoModule({
  action,
  copy,
  customCopyStyles,
  customTitleStyles,
  dataVendor,
  featureDescription,
  icon,
  title,
}: FeaturedInfoModuleProps) {
  return (
    <div css={styles.container}>
      {icon && <Icon name={icon} css={styles.icon} />}
      {featureDescription && (
        <h2 css={styles.featureDescription}>{featureDescription}</h2>
      )}

      <h3 css={[styles.title, customTitleStyles]}>
        <Markdown renderers={{ paragraph: 'span' }}>{title}</Markdown>
      </h3>
      <div css={[styles.copy, customCopyStyles]}>
        <Markdown>{copy}</Markdown>
      </div>
      {action && (
        <Link
          css={styles.action}
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
