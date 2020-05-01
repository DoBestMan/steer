import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { typography } from '~/styles/typography.styles';

import styles from './BrowseTires.styles';

function CategoryInfo({
  title,
  body,
}: NonNullable<SiteMenuBrowseItem['info']>) {
  return (
    <span css={[typography.smallCopy, styles.info]}>
      <h4 css={styles.infoTitle}>{title}</h4>
      <p>{body}</p>
    </span>
  );
}

export default CategoryInfo;
