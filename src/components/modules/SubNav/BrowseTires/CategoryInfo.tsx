import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';

import styles from './BrowseTires.styles';

function CategoryInfo({
  title,
  body,
}: NonNullable<SiteMenuBrowseItem['info']>) {
  return (
    <span css={styles.info}>
      <p css={styles.infoTitle}>{title}</p>
      <p>{body}</p>
    </span>
  );
}

export default CategoryInfo;
