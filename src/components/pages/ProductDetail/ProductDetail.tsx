import dynamic from 'next/dynamic';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import DataStructure from '~/components/global/DataStructure/DataStructure';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Meta from '~/components/global/Meta/Meta';
import CTAList from '~/components/modules/Compare/CompareModal/CTAList/CTAList';
import TireWithInfoList from '~/components/modules/Compare/CompareModal/TireWithInfoList/TireWithInfoList';
import CompareTable from '~/components/modules/Compare/CompareTable/CompareTable';
import {
  SCROLLBAR_DIRRECTION,
  useHasScrollBar,
} from '~/components/modules/Compare/CompareTable/CompareTable.hooks';
import ModuleProductLineFAQs from '~/components/modules/EditorialModules/modules/ModuleProductLineFAQs/ModuleProductLineFAQs';
import LocationModal from '~/components/modules/Location/LocationModal/LocationModal';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import AnchorBar from '~/components/modules/PDP/AnchorBar/AnchorBar';
import ConfirmFitInsight from '~/components/modules/PDP/ConfirmFitInsight/ConfirmFitInsight';
import { ConfirmFitType } from '~/components/modules/PDP/ConfirmFitInsight/ConfirmFitInsight.utils';
import Insights from '~/components/modules/PDP/Insights/Insights';
import ProductInfo from '~/components/modules/PDP/ProductInfo/ProductInfo';
import PurchaseIncludes from '~/components/modules/PDP/PurchaseIncludes/PurchaseIncludes';
import ShopWithConfidence from '~/components/modules/PDP/ShopWithConfidence/ShopWithConfidence';
import TireImage from '~/components/modules/PDP/TireImage/TireImage';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { useModalContext } from '~/context/Modal.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import Error from '~/pages/_error';

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
const DynamicConfirmFitStickyBar = dynamic(() =>
  import('~/components/modules/PDP/ConfirmFitStickyBar/ConfirmFitStickyBar'),
);

function ProductDetail({ serverData }: ProductDetailData) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const stickyBarAvoidSection = useRef<HTMLDivElement>(null);
  const stickyBarDarkSection = useRef<HTMLDivElement>(null);
  const stickyBarInsightBottomSection = useRef<HTMLDivElement>(null);
  const stickyBarInsightTopSection = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoints();
  const { openStaticModal, openDynamicModal } = useModalContext();
  const {
    anchorList,
    breadcrumbs,
    assetList,
    insights,
    installation,
    instantRebateInsight,
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
    statusCode,
    popularTableData,
    popularCompareList,
    addToCartFromCompareList,
    siteFaqs,
  } = useProductDetail({
    serverData,
  });
  const {
    positionCuration0,
    positionCuration1,
    positionCuration2,
  } = useExperimentPLA({
    isPLA,
    hasRecirculation: isPLA && recirculation && recirculation.length > 0,
  });

  const { ref: compareTableWrapper, hasScrollbar } = useHasScrollBar({
    direction: SCROLLBAR_DIRRECTION.HORIZONTAL,
  });

  const { isLoading } = useProductDetailContext();

  function reloadPageIfPersisted({ persisted }: { persisted: boolean }) {
    if (persisted) {
      window.location.reload();
    }
  }

  function toggleModal() {
    setIsLocationModalOpen(!isLocationModalOpen);
  }

  const reviewsObj = {
    hasReviews: !!(reviews.reviews && reviews.reviews.length),
    refId: ANCHORS.REVIEWS_ANCHOR,
  };
  /*
    implemented for SIM-10712
    used for browsers (mostly Safari) that cache the previous page
    when navigating away from simpletire and going back.
  */
  useEffect(() => {
    window.addEventListener('pageshow', reloadPageIfPersisted);
    return () => {
      window.removeEventListener('pageshow', reloadPageIfPersisted);
    };
  }, []);

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <>
      <Meta {...meta} />
      {linkingData && <DataStructure jsonLD={linkingData} />}
      <GridItem fullbleed css={styles.insightStickyBar}>
        {insights &&
          insights.confirmFitItems &&
          insights.confirmFitItems.length === 1 &&
          insights.confirmFitItems[0].type === ConfirmFitType.DEFAULT &&
          productInfo &&
          productInfo.size && (
            <DynamicConfirmFitStickyBar
              avoidSection={stickyBarInsightBottomSection}
              avoidTopSection={stickyBarInsightTopSection}
              data={insights.confirmFitItems[0]}
            />
          )}
      </GridItem>
      <Grid
        css={[
          navigationBreadcrumbPaddingTop,
          styles.root,
          isPLA && isMobile && styles.shopTiresBySpace,
        ]}
      >
        <GridItem gridColumnL="start/8" gridRowL="1" css={styles.breadcrumbs}>
          <Breadcrumbs navigationItems={breadcrumbs} />
        </GridItem>
        <GridItem
          fullbleed
          gridColumnL="start/8"
          gridRowL="2/3"
          css={styles.tireImage}
        >
          <div ref={stickyBarInsightTopSection}>
            <TireImage assetList={assetList} brand={productInfo.brand} />
          </div>
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
            <GridItem fullbleed css={styles.anchorBar}>
              <AnchorBar anchorList={anchorList} />
            </GridItem>
            <GridItem
              fullbleed
              css={[styles.insights, styles.confirmFitContainer]}
            >
              <div ref={stickyBarInsightBottomSection}>
                {insights &&
                  insights.confirmFitItems &&
                  productInfo &&
                  productInfo.size &&
                  insights.confirmFitItems.map((item, index) => (
                    <li
                      key={index}
                      data-component={`${item.type}-your-vehicle-component`}
                      css={styles.confirmFitItem}
                    >
                      <ConfirmFitInsight
                        {...item}
                        isLoading={isLoading}
                        tireSize={productInfo.size}
                      />
                    </li>
                  ))}
              </div>
            </GridItem>
            {insights && (
              <GridItem
                fullbleed
                css={
                  (!insights.confirmFitItems ||
                    !productInfo.size ||
                    isLoading) &&
                  styles.insights
                }
              >
                <div id={ANCHORS.INSIGHTS_ANCHOR}>
                  <Insights
                    {...insights}
                    size={productInfo.size}
                    isLoading={isLoading}
                    instantRebateInsight={instantRebateInsight}
                    handleChangeLocation={toggleModal}
                    openDynamicModal={openDynamicModal}
                  />
                </div>
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
              <DynamicInstallation
                {...installation}
                openStaticModal={openStaticModal}
              />
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
            {siteFaqs && <ModuleProductLineFAQs {...siteFaqs} />}
          </div>
        </GridItem>
      </Grid>
      {popularTableData && popularCompareList && (
        <ScrollSync vertical={false}>
          <div>
            <div css={styles.header}>
              <h3 css={styles.title}>{ui('catalog.popularCompare.title')}</h3>
              <p css={styles.subTitle}>
                {ui('catalog.popularCompare.subTitle')}
              </p>
            </div>
            <ScrollSyncPane>
              <div css={styles.tireWithInfoList}>
                <TireWithInfoList
                  productList={popularCompareList}
                  customRootStyle={styles.tireWithInfoListRootStyle}
                />
              </div>
            </ScrollSyncPane>
            <ScrollSyncPane>
              <div css={styles.ctaListWrapper}>
                <CTAList
                  productList={popularCompareList}
                  addToCart={addToCartFromCompareList}
                  customRootStyle={styles.ctaListRoot}
                />
              </div>
            </ScrollSyncPane>
            {popularTableData &&
              popularTableData.map(({ caption, columns, data }, index) => {
                return (
                  <>
                    {caption && (
                      <h3 css={styles.caption}>
                        <span>{caption}</span>
                      </h3>
                    )}
                    <ScrollSyncPane key={index}>
                      <div
                        css={[
                          styles.tableListWrapper,
                          index === popularTableData.length - 1 &&
                            styles.lastTable,
                        ]}
                        ref={compareTableWrapper as RefObject<HTMLDivElement>}
                      >
                        <CompareTable
                          columns={columns}
                          data={data}
                          caption={caption}
                          hasScrollbar={hasScrollbar}
                          customRootStyle={styles.compareTableRoot}
                          headerStyle={styles.tableHeader}
                        />
                      </div>
                    </ScrollSyncPane>
                  </>
                );
              })}
          </div>
        </ScrollSync>
      )}
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
      {stickyBar && (
        <GridItem fullbleed css={styles.stickyBar}>
          <DynamicPDPStickyBar
            avoidSection={stickyBarAvoidSection}
            darkSection={stickyBarDarkSection}
            {...stickyBar}
          />
        </GridItem>
      )}
    </>
  );
}

export default ProductDetail;
