import { useRef, useState } from 'react';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import DataStructure from '~/components/global/DataStructure/DataStructure';
import Feedback from '~/components/global/Feedback/Feedback';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import Meta from '~/components/global/Meta/Meta';
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
import PDPStickyBar from '~/components/modules/PDP/StickyBar/StickyBar';
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

function ProductDetail({ serverData }: ProductDetailData) {
  const {
    breadcrumbs,
    faq,
    assetList,
    insights,
    installation,
    isPLA,
    isSizeSelectorOpen,
    linkingData,
    meta,
    onChangeSize,
    onClickChangeSize,
    onCloseSizeSelector,
    productInfo,
    recirculation,
    recirculationSize,
    reviews,
    reviewsAnchor,
    sizeFinder,
    stickyBar,
    technicalSpecs,
    technicalSpecsAnchor,
  } = useProductDetail({
    serverData,
  });
  const { openStaticModal, openDynamicModal } = useModalContext();
  const stickyBarAvoidSection = useRef<HTMLDivElement>(null);
  const stickyBarDarkSection = useRef<HTMLDivElement>(null);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  function toggleModal() {
    setIsLocationModalOpen(!isLocationModalOpen);
  }

  return (
    <div css={styles.root}>
      <Meta {...meta} />
      {linkingData && <DataStructure jsonLD={linkingData} />}
      <Grid css={navigationPaddingTop}>
        <GridItem gridColumnL="start/8" gridRowL="1" css={styles.breadcrumbs}>
          <Breadcrumbs navigationItems={breadcrumbs} />
        </GridItem>
        <GridItem gridColumnL="start/8" gridRowL="2/3" css={styles.tireImage}>
          <TireImage assetList={assetList} brand={productInfo.brand} />
        </GridItem>
        <GridItem
          fullbleed
          gridColumnL="8/14"
          gridRowL="1/4"
          css={styles.productInfo}
        >
          <div ref={stickyBarAvoidSection}>
            <Grid>
              <GridItem fullbleedL>
                <ProductInfo
                  sizeFinder={sizeFinder}
                  isSizeSelectorOpen={isSizeSelectorOpen}
                  onChangeSize={onChangeSize}
                  onClickChangeSize={onClickChangeSize}
                  onCloseSizeSelector={onCloseSizeSelector}
                  openDynamicModal={openDynamicModal}
                  {...productInfo}
                />
              </GridItem>
              <GridItem fullbleed css={styles.insights}>
                <Insights
                  {...insights}
                  handleChangeLocation={toggleModal}
                  openDynamicModal={openDynamicModal}
                  css={styles.insights}
                />
              </GridItem>
            </Grid>
          </div>
        </GridItem>
        {installation && (
          <GridItem fullbleed css={styles.installation}>
            <Installation {...installation} />
          </GridItem>
        )}
        <GridItem fullbleed css={styles.purchaseIncludes}>
          <PurchaseIncludes openStaticModal={openStaticModal} />
        </GridItem>
        <GridItem gridColumnL="3/13" css={styles.shopWithConfidence}>
          <ShopWithConfidence />
        </GridItem>
        {isPLA && recirculation?.length && (
          <>
            <GridItem fullbleed css={styles.featuredRecirculation}>
              <ProductGroupList
                headerCustomStyles={styles.recirculationHeader}
                itemCustomStyle={styles.recirculationItem}
                {...recirculation[0]}
              />
            </GridItem>
          </>
        )}
        <GridItem fullbleed>
          <div ref={stickyBarDarkSection} css={styles.detailsSection}>
            {reviews && (
              <div id={reviewsAnchor}>
                <Reviews {...reviews} />
              </div>
            )}
            {technicalSpecs && (
              <div id={technicalSpecsAnchor}>
                <TechnicalSpecs
                  openStaticModal={openStaticModal}
                  {...technicalSpecs}
                />
              </div>
            )}
            <FAQ {...faq} />
          </div>
        </GridItem>
        {recirculation?.length &&
          recirculation.slice(isPLA ? 1 : 0).map((item) => (
            <GridItem fullbleed css={styles.recirculation} key={item.id}>
              <ProductGroupList {...item} />
            </GridItem>
          ))}
        <GridItem css={styles.recirculationSize}>
          {recirculationSize && (
            <Link href={recirculationSize.url} theme={THEME.LIGHT}>
              {recirculationSize.label}
            </Link>
          )}
        </GridItem>
        {stickyBar && (
          <GridItem fullbleed css={styles.stickyBar}>
            <PDPStickyBar
              avoidSection={stickyBarAvoidSection}
              darkSection={stickyBarDarkSection}
              {...stickyBar}
            />
          </GridItem>
        )}
      </Grid>
      <Feedback />

      <LocationModal isOpen={isLocationModalOpen} onClose={toggleModal} />
    </div>
  );
}

export default ProductDetail;
