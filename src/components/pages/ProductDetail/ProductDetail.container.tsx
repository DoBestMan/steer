import { useState } from 'react';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Feedback from '~/components/global/Feedback/Feedback';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import LocationModal from '~/components/modules/Location/LocationModal/LocationModal';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import FAQ from '~/components/modules/PDP/FAQ/FAQ';
import Insights from '~/components/modules/PDP/Insights/Insights';
import Installation from '~/components/modules/PDP/Installation/Installation';
import ProductInfo from '~/components/modules/PDP/ProductInfo/ProductInfo';
import PurchaseIncludes from '~/components/modules/PDP/PurchaseIncludes/PurchaseIncludes';
import Reviews from '~/components/modules/PDP/Reviews/Reviews';
import ShopWithConfidence from '~/components/modules/PDP/ShopWithConfidence/ShopWithConfidence';
import TechnicalSpecs from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import TireImage from '~/components/modules/PDP/TireImage/TireImage';
import { useModalContext } from '~/context/Modal.context';
import { THEME } from '~/lib/constants';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import useProductDetail from './ProductDetail.hooks';
import styles from './ProductDetail.styles';

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ProductDetailContainer({ serverData }: ProductDetailData) {
  const {
    breadcrumbs,
    faq,
    imageList,
    insights,
    installation,
    productInfo,
    recirculation,
    recirculationSize,
    reviews,
    reviewsAnchor,
    technicalSpecs,
    technicalSpecsAnchor,
  } = useProductDetail({
    serverData,
  });
  const { openStaticModal, openDynamicModal } = useModalContext();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  function toggleModal() {
    setIsLocationModalOpen(!isLocationModalOpen);
  }

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
          <Insights
            {...insights}
            handleChangeLocation={toggleModal}
            openDynamicModal={openDynamicModal}
            css={styles.insights}
          />
        </GridItem>
        {installation && (
          <GridItem fullbleed css={styles.installation}>
            <Installation {...installation} />
          </GridItem>
        )}
        <GridItem fullbleed css={styles.purchaseIncludes}>
          <PurchaseIncludes openStaticModal={openStaticModal} />
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
        <GridItem fullbleed css={styles.detailsSection}>
          {reviews && (
            <div id={reviewsAnchor}>
              <Reviews {...reviews} />
            </div>
          )}
          {technicalSpecs && (
            <div id={technicalSpecsAnchor}>
              <TechnicalSpecs {...technicalSpecs} />
            </div>
          )}
          {faq && (
            <div>
              <FAQ {...faq} />
            </div>
          )}
        </GridItem>
        {recirculation &&
          recirculation.slice(1).map((item) => (
            <GridItem fullbleed css={styles.recirculation} key={item.id}>
              <ProductGroupList {...item} />
            </GridItem>
          ))}
        {recirculationSize && (
          <GridItem css={styles.recirculationSize}>
            <Link href={recirculationSize.url} theme={THEME.LIGHT}>
              {recirculationSize.label}
            </Link>
          </GridItem>
        )}
        <GridItem fullbleed css={styles.feedback}>
          <Feedback />
        </GridItem>
      </Grid>

      <LocationModal isOpen={isLocationModalOpen} onClose={toggleModal} />
    </div>
  );
}

export default ProductDetailContainer;
