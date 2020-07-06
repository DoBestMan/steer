import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogPromotion } from '~/data/models/SiteCatalogPromotionInfo';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';

import styles, { clickableStyles } from './PromoTag.styles';

export interface PromoTagProps extends SiteCatalogPromotion {
  handleClick?: (event: React.MouseEvent) => void;
}

function PromoTag({
  style = SitePromotionStyleEnum.SitePromotionItemDefault,
  label,
  icon,
  isUppercase,
  handleClick,
}: PromoTagProps) {
  const sharedStyles = [
    styles.root,
    styles[style],
    isUppercase && styles.uppercase,
  ];

  if (handleClick) {
    return (
      <button
        css={[...sharedStyles, clickableStyles[style]]}
        onClick={handleClick}
      >
        {label}
        {icon && <Icon css={styles.icon} name={icon.svgId} />}
      </button>
    );
  }

  return (
    <div css={sharedStyles}>
      {label}
      {icon && <Icon css={styles.icon} name={icon.svgId} />}
    </div>
  );
}

export default PromoTag;
