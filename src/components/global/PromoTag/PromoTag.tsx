import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogPromotion } from '~/data/models/SiteCatalogPromotionInfo';

import styles from './PromoTag.styles';

function PromoTag({ style, label, icon, isUppercase }: SiteCatalogPromotion) {
  return (
    <div css={[styles.root, styles[style], isUppercase && styles.uppercase]}>
      {label}
      {icon && <Icon css={styles.icon} name={icon.svgId} />}
    </div>
  );
}

export default PromoTag;
