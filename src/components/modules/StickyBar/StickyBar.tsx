import { ReactNode } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { CSSStyles, THEME } from '~/lib/constants';

import styles from './StickyBar.styles';

interface Props {
  children: ReactNode;
  icon?: IconType;
  isStickyBottom?: boolean;
  isStickyTop?: boolean;
  logo?: SiteImage;
  primaryColumnCustomStyles?: CSSStyles;
  secondaryLabel?: string;
  theme: THEME;
}

function StickyBar({
  children,
  icon,
  isStickyBottom,
  isStickyTop,
  logo,
  primaryColumnCustomStyles,
  secondaryLabel,
  theme,
}: Props) {
  return (
    <div
      css={[
        styles.container,
        styles[theme],
        isStickyBottom && styles.stickyBottom,
        isStickyTop && styles.stickyTop,
      ]}
    >
      {(logo || secondaryLabel || icon) && (
        <>
          {icon && <Icon name={icon} css={styles.icon} />}
          <div css={styles.secondaryColumn}>
            {logo && (
              <div>
                <Image
                  css={styles.logo}
                  altText={logo.altText}
                  src={logo.src}
                />
              </div>
            )}

            {secondaryLabel && (
              <p css={styles.secondaryLabel}>{secondaryLabel}</p>
            )}
          </div>
        </>
      )}

      <div css={[styles.primaryColumn, primaryColumnCustomStyles]}>
        {children}
      </div>
    </div>
  );
}

export default StickyBar;
