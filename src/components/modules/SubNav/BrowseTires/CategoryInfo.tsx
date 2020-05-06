import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';

import styles from './BrowseTires.styles';

function CategoryInfo({
  title,
  body,
}: NonNullable<SiteMenuBrowseItem['info']>) {
  return (
    <span css={styles.info}>
      <h4 css={styles.infoTitle}>{title}</h4>
      <p>{body}</p>
    </span>
  );
}

export default CategoryInfo;
