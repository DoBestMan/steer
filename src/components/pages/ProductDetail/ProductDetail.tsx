import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import DataStructure from '~/components/global/DataStructure/DataStructure';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Meta from '~/components/global/Meta/Meta';
import LocationModal from '~/components/modules/Location/LocationModal/LocationModal';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import AnchorBar from '~/components/modules/PDP/AnchorBar/AnchorBar';
import FAQ from '~/components/modules/PDP/FAQ/FAQ';
import Insights from '~/components/modules/PDP/Insights/Insights';
import ProductInfo from '~/components/modules/PDP/ProductInfo/ProductInfo';
import PurchaseIncludes from '~/components/modules/PDP/PurchaseIncludes/PurchaseIncludes';
import ShopWithConfidence from '~/components/modules/PDP/ShopWithConfidence/ShopWithConfidence';
import TireImage from '~/components/modules/PDP/TireImage/TireImage';
import { useModalContext } from '~/context/Modal.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_THEME } from '~/lib/constants';

import useExperimentPLA from './experiments/useExperimentPLA';
import { ANCHORS } from './mappers/anchorList';
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
  const { lessThan } = useBreakpoints();
  const {
    anchorList,
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
    sizeFinder,
    stickyBar,
    technicalSpecs,
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

  const reviewsObj = {
    hasReviews: !!(reviews.reviews && reviews.reviews.length),
    refId: ANCHORS.REVIEWS_ANCHOR,
  };

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
          <Grid>
            <GridItem fullbleedL>
              <div ref={stickyBarAvoidSection}>
                <ProductInfo
                  sizeFinder={sizeFinder}
                  openDynamicModal={openDynamicModal}
                  reviews={reviewsObj}
                  {...productInfo}
                />
              </div>
            </GridItem>
            {lessThan.L && (
              <GridItem fullbleed css={styles.anchorBar}>
                <AnchorBar anchorList={anchorList} />
              </GridItem>
            )}
            {insights && (
              <GridItem fullbleed css={styles.insights}>
                <div id={ANCHORS.INSIGHTS_ANCHOR}>
                  <Insights
                    {...insights}
                    handleChangeLocation={toggleModal}
                    openDynamicModal={openDynamicModal}
                  />
                </div>
              </GridItem>
            )}
            {!lessThan.L && (
              <GridItem fullbleed css={styles.anchorBar}>
                <AnchorBar anchorList={anchorList} />
              </GridItem>
            )}
          </Grid>
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
        {isPLA && technicalSpecs && (
          <GridItem fullbleed>
            <div css={styles.plaTechSpecs} id={ANCHORS.DESCRIPTION_ANCHOR}>
              <DynamicTechnicalSpecs
                openStaticModal={openStaticModal}
                techSpecsAnchor={ANCHORS.TECH_SPECS_ANCHOR}
                {...technicalSpecs}
              />
            </div>
          </GridItem>
        )}
        {installation && (
          <GridItem fullbleed css={styles.installation}>
            <div id={ANCHORS.INSTALLATION_ANCHOR}>
              <DynamicInstallation {...installation} />
            </div>
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
        <GridItem fullbleed css={styles.shopWithConfidence}>
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
              <div id={ANCHORS.REVIEWS_ANCHOR}>
                <DynamicReviews {...reviews} />
              </div>
            )}
            {!isPLA && technicalSpecs && (
              <div id={ANCHORS.DESCRIPTION_ANCHOR}>
                <DynamicTechnicalSpecs
                  openStaticModal={openStaticModal}
                  techSpecsAnchor={ANCHORS.TECH_SPECS_ANCHOR}
                  {...technicalSpecs}
                />
              </div>
            )}
            <FAQ {...faq} />
          </div>
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
      {recirculation?.length && (
        <Grid css={styles.recirculationContainer}>
          {recirculation.slice(isPLA ? 1 : 0).map((item) => (
            <GridItem fullbleed css={styles.recirculation} key={item.id}>
              <DynamicProductGroupList {...item} />
            </GridItem>
          ))}
          {recirculationSize && (
            <GridItem css={styles.recirculationSize}>
              <Link
                css={styles.recirculationSizeLink}
                href={recirculationSize.url}
                theme={LINK_THEME.LIGHT_HIGHLIGHTED}
                icon={ICONS.CHEVRON_RIGHT}
              >
                {recirculationSize.label}
              </Link>
            </GridItem>
          )}
        </Grid>
      )}

      <LocationModal isOpen={isLocationModalOpen} onClose={toggleModal} />
    </>
  );
}

export default ProductDetail;
