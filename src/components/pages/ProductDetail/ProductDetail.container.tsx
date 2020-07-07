import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Insights from '~/components/modules/PDP/Insights/Insights';
import ProductInfo from '~/components/modules/PDP/ProductInfo/ProductInfo';
import TireImage from '~/components/modules/PDP/TireImage/TireImage';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import useProductDetail from './ProductDetail.hooks';
import styles from './ProductDetail.styles';

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ProductDetailContainer({ serverData }: ProductDetailData) {
  const { breadcrumbs, imageList, productInfo, insights } = useProductDetail({
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
      </Grid>
    </div>
  );
}

export default ProductDetailContainer;
