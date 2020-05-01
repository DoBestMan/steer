import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { typography } from '~/styles/typography.styles';

import styles from './SubNav.styles';

function CategoryInfo({
  title,
  body,
}: NonNullable<SiteMenuBrowseItem['info']>) {
  return (
    <p css={[typography.smallCopy, styles.info]}>
      <h4 css={styles.infoTitle}>{title}</h4>
      {body}
    </p>
  );
}

export default CategoryInfo;
