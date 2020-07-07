import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';

import styles from './CatalogProductGroups.styles';

interface Props {
  isLoading?: boolean;
  productGroupList: SiteCatalogProductGroupList;
}

function CatalogProductGroups({ productGroupList, isLoading }: Props) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
