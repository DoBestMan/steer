import { ReactNode } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { THEME } from '~/lib/constants';

import styles from './StickyBar.styles';

interface Props {
  children: ReactNode;
  icon?: IconType;
  logo?: SiteImage;
  secondaryLabel?: string;
  theme: THEME;
}

function StickyBar({ children, icon, logo, secondaryLabel, theme }: Props) {
  return (
    <div css={[styles.container, styles[theme]]}>
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

      <div css={styles.primaryColumn}>{children}</div>
    </div>
  );
}

export default StickyBar;
