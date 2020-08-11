import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import DataStructure from '~/components/global/DataStructure/DataStructure';
import Feedback from '~/components/global/Feedback/Feedback';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import Meta from '~/components/global/Meta/Meta';
import LocationModal from '~/components/modules/Location/LocationModal/LocationModal';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import FAQ from '~/components/modules/PDP/FAQ/FAQ';
import Insights from '~/components/modules/PDP/Insights/Insights';
import ProductInfo from '~/components/modules/PDP/ProductInfo/ProductInfo';
import PurchaseIncludes from '~/components/modules/PDP/PurchaseIncludes/PurchaseIncludes';
import ShopWithConfidence from '~/components/modules/PDP/ShopWithConfidence/ShopWithConfidence';
import TireImage from '~/components/modules/PDP/TireImage/TireImage';
import { useModalContext } from '~/context/Modal.context';
import { THEME } from '~/lib/constants';

import useExperimentPLA from './experiments/useExperimentPLA';
import useProductDetail from './ProductDetail.hooks';
import styles from './ProductDetail.styles';
import { ProductDetailData } from './ProductDetail.types';

const DynamicProductGroupList = dynamic(() =>
  import('~/components/global/ProductGroupList/ProductGroupList'),
);
const DynamicInstallation = dynamic(() =>
  import('~/components/modules/PDP/Installation/Installation'),
);
const DynamicReviews = dynamic(() =>
  import('~/components/modules/PDP/Reviews/Reviews'),
);
const DynamicTechnicalSpecs = dynamic(() =>
  import('~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs'),
);
const DynamicPDPStickyBar = dynamic(() =>
  import('~/components/modules/PDP/StickyBar/StickyBar'),
);

function ProductDetail({ serverData }: ProductDetailData) {
  const {
    breadcrumbs,
    faq,
    assetList,
    insights,
    installation,
    isPLA,
    linkingData,
    meta,
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
  const {
    positionCuration0,
    positionCuration1,
    positionCuration2,
  } = useExperimentPLA({
    isPLA,
    hasRecirculation: isPLA && recirculation && recirculation.length > 0,
  });
  const stickyBarAvoidSection = useRef<HTMLDivElement>(null);
  const stickyBarDarkSection = useRef<HTMLDivElement>(null);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  function toggleModal() {
    setIsLocationModalOpen(!isLocationModalOpen);
  }

  return (
    <>
      <Meta {...meta} />
      {linkingData && <DataStructure jsonLD={linkingData} />}
      <Grid css={[navigationBreadcrumbPaddingTop, styles.root]}>
        <GridItem gridColumnL="start/8" gridRowL="1" css={styles.breadcrumbs}>
          <Breadcrumbs navigationItems={breadcrumbs} />
        </GridItem>
        <GridItem
          fullbleed
          gridColumnL="start/8"
          gridRowL="2/3"
          css={styles.tireImage}
        >
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
                  openDynamicModal={openDynamicModal}
                  {...productInfo}
                />
              </GridItem>
              <GridItem fullbleed css={styles.insights}>
                <Insights
                  {...insights}
                  handleChangeLocation={toggleModal}
                  openDynamicModal={openDynamicModal}
                />
              </GridItem>
            </Grid>
          </div>
        </GridItem>
        {positionCuration1 && recirculation && (
          <>
            <GridItem fullbleed css={styles.featuredRecirculation}>
              <DynamicProductGroupList
                customHeaderStyles={styles.recirculationHeader}
                customItemStyles={styles.recirculationItem}
                {...recirculation[0]}
              />
            </GridItem>
          </>
        )}
        {installation && (
          <GridItem fullbleed css={styles.installation}>
            <DynamicInstallation {...installation} />
          </GridItem>
        )}
        {positionCuration2 && recirculation && (
          <>
            <GridItem fullbleed css={styles.featuredRecirculation}>
              <DynamicProductGroupList
                customHeaderStyles={styles.recirculationHeader}
                customItemStyles={styles.recirculationItem}
                {...recirculation[0]}
              />
            </GridItem>
          </>
        )}
        <GridItem fullbleed css={styles.purchaseIncludes}>
          <PurchaseIncludes openStaticModal={openStaticModal} />
        </GridItem>
        <GridItem gridColumnL="3/13" css={styles.shopWithConfidence}>
          <ShopWithConfidence />
        </GridItem>
        {positionCuration0 && recirculation && (
          <>
            <GridItem fullbleed css={styles.featuredRecirculation}>
              <DynamicProductGroupList
                customHeaderStyles={styles.recirculationHeader}
                customItemStyles={styles.recirculationItem}
                {...recirculation[0]}
              />
            </GridItem>
          </>
        )}
        <GridItem fullbleed>
          <div ref={stickyBarDarkSection} css={styles.detailsSection}>
            {reviews && (
              <div id={reviewsAnchor}>
                <DynamicReviews {...reviews} />
              </div>
            )}
            {technicalSpecs && (
              <div id={technicalSpecsAnchor}>
                <DynamicTechnicalSpecs
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
              <DynamicProductGroupList {...item} />
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
            <DynamicPDPStickyBar
              avoidSection={stickyBarAvoidSection}
              darkSection={stickyBarDarkSection}
              {...stickyBar}
            />
          </GridItem>
        )}
      </Grid>
      <Feedback />

      <LocationModal isOpen={isLocationModalOpen} onClose={toggleModal} />
    </>
  );
}

export default ProductDetail;
