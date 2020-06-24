import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogPromotion } from '~/data/models/SiteCatalogPromotionInfo';

import styles, { clickableStyles } from './PromoTag.styles';
import { PROMO_STYLES } from './PromoTag.types';

export interface PromoTagProps extends SiteCatalogPromotion {
  handleClick?: (event: React.MouseEvent) => void;
}

function PromoTag({
  style = PROMO_STYLES.DEFAULT,
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
