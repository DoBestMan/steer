import { ReactNode } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { CSSStylesProp, THEME } from '~/lib/constants';
import { getInvertedImageTransformations } from '~/lib/utils/cloudinary/cloudinary';

import styles from './StickyBar.styles';

interface Props {
  children: ReactNode;
  customPrimaryColStyles?: CSSStylesProp;
  icon?: IconType;
  isStickyBottom?: boolean;
  isStickyTop?: boolean;
  logo?: SiteImage | null;
  secondaryLabel?: string;
  theme: THEME;
}

function StickyBar({
  children,
  icon,
  isStickyBottom,
  isStickyTop,
  logo,
  customPrimaryColStyles,
  secondaryLabel,
  theme,
}: Props) {
  const brandSrcTransformationArgs = getInvertedImageTransformations([200]);

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
                  srcTransformationArgs={brandSrcTransformationArgs}
                />
              </div>
            )}

            {secondaryLabel && (
              <p css={styles.secondaryLabel}>{secondaryLabel}</p>
            )}
          </div>
        </>
      )}

      <div css={[styles.primaryColumn, customPrimaryColStyles]}>{children}</div>
    </div>
  );
}

export default StickyBar;
