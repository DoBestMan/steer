import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogPromotion } from '~/data/models/SiteCatalogPromotionList';

import styles from './PromoTag.styles';

function PromoTag({ style, label, icon }: SiteCatalogPromotion) {
  return (
    <div css={[styles.root, styles[style]]}>
      {label}
      <Icon css={styles.icon} name={icon.svgId} />
    </div>
  );
}

export default PromoTag;
