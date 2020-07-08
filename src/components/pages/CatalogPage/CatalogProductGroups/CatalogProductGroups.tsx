import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import ProductGroupListPlaceholder from '~/components/global/ProductGroupList/ProductGroupListPlaceholder';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';

import styles from './CatalogProductGroups.styles';

interface Props {
  isLoading?: boolean;
  productGroupList: SiteCatalogProductGroupList;
}

function CatalogProductGroups({ productGroupList, isLoading }: Props) {
  return (
    <div css={styles.root}>
      {isLoading
        ? Array(3)
            .fill({})
            .map((_, i) => (
              <div css={styles.group} key={i}>
                <ProductGroupListPlaceholder />
              </div>
            ))
        : productGroupList.map((group) => (
            <div key={group.id} css={styles.group}>
              <ProductGroupList {...group} />
            </div>
          ))}
    </div>
  );
}

export default CatalogProductGroups;
