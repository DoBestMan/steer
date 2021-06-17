import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogPromotion } from '~/data/models/SiteCatalogPromotionInfo';
import { SiteDynamicModal } from '~/data/models/SiteDynamicModal';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { THEME } from '~/lib/constants/theme';

import styles, { clickableStyles } from './PromoTag.styles';

export interface PromoTagProps extends SiteCatalogPromotion {
  handleClick?: (event: React.MouseEvent) => void;
  shouldClickOnIcon?: boolean;
  siteDynamicModal?: SiteDynamicModal;
}

function PromoTag({
  style = SitePromotionStyleEnum.SitePromotionItemDefault,
  label,
  icon,
  isUppercase,
  shouldClickOnIcon = false,
  handleClick,
}: PromoTagProps) {
  const sharedStyles = [
    styles.root,
    styles[style],
    isUppercase && styles.uppercase,
  ];

  if (handleClick) {
    if (shouldClickOnIcon) {
      return (
        <button css={sharedStyles}>
          {label}
          {icon && (
            <Icon
              css={styles.icon}
              ssHeight="auto"
              name={icon.svgId}
              ssWidth={20}
              theme={THEME.DARK}
              onClick={handleClick}
              ssr
            />
          )}
        </button>
      );
    } else {
      return (
        <button
          css={[...sharedStyles, clickableStyles[style]]}
          onClick={handleClick}
        >
          {label}
          {icon && (
            <Icon
              css={styles.icon}
              ssHeight="auto"
              name={icon.svgId}
              ssWidth={20}
              theme={THEME.DARK}
              ssr
            />
          )}
        </button>
      );
    }
  }

  return (
    <div css={sharedStyles}>
      {label}
      {icon && (
        <Icon
          css={styles.icon}
          ssHeight="auto"
          name={icon.svgId}
          ssWidth={20}
          theme={THEME.DARK}
          ssr
        />
      )}
    </div>
  );
}

export default PromoTag;
