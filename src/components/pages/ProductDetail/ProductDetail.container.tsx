import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Insights from '~/components/modules/PDP/Insights/Insights';
import Installation from '~/components/modules/PDP/Installation/Installation';
import ProductInfo from '~/components/modules/PDP/ProductInfo/ProductInfo';
import PurchaseIncludes from '~/components/modules/PDP/PurchaseIncludes/PurchaseIncludes';
import ShopWithConfidence from '~/components/modules/PDP/ShopWithConfidence/ShopWithConfidence';
import TireImage from '~/components/modules/PDP/TireImage/TireImage';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import useProductDetail from './ProductDetail.hooks';
import styles from './ProductDetail.styles';

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ProductDetailContainer({ serverData }: ProductDetailData) {
  const {
    breadcrumbs,
    imageList,
    insights,
    installation,
    productInfo,
    recirculation,
  } = useProductDetail({
    serverData,
  });

  return (
    <div css={styles.root}>
      <Grid css={navigationPaddingTop}>
        <GridItem gridColumnL="start/8" gridRowL="1" css={styles.breadcrumbs}>
          <Breadcrumbs navigationItems={breadcrumbs} />
        </GridItem>
        <GridItem gridColumnL="start/8" gridRowL="2/4" css={styles.tireImage}>
          <TireImage imageList={imageList} brand={productInfo.brand} />
        </GridItem>
        <GridItem gridColumnL="8/14" gridRowL="1/3" css={styles.productInfo}>
          <ProductInfo {...productInfo} />
        </GridItem>
        <GridItem
          fullbleed
          gridColumnL="8/14"
          gridRowL="3"
          css={styles.productInfo}
        >
          <Insights {...insights} css={styles.insights} />
        </GridItem>
        {installation && (
          <GridItem fullbleed css={styles.installation}>
            <Installation {...installation} />
          </GridItem>
        )}
        <GridItem fullbleed css={styles.purchaseIncludes}>
          <PurchaseIncludes />
        </GridItem>
        {recirculation && (
          <GridItem fullbleed css={styles.featuredRecirculation}>
            <ProductGroupList
              headerCustomStyles={styles.recirculationHeader}
              itemCustomStyle={styles.recirculationItem}
              {...recirculation[0]}
            />
          </GridItem>
        )}
        <GridItem gridColumnL="3/13" css={styles.shopWithConfidence}>
          <ShopWithConfidence />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ProductDetailContainer;
