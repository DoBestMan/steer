import ProductGroupList from '~/components/modules/Catalog/ProductGroupList/ProductGroupList';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';

import styles from './CatalogProductGroups.styles';

interface Props {
  productGroupList: SiteCatalogProductGroupList;
}

function CatalogProductGroups({ productGroupList }: Props) {
  return (
    <div css={styles.root}>
      {productGroupList.map((group) => (
        <div key={group.id} css={styles.group}>
          <ProductGroupList {...group} />
        </div>
      ))}
    </div>
  );
}

export default CatalogProductGroups;
