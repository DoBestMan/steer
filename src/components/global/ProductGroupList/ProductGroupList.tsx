import React, { useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import TopTireDetailsModal from '~/components/global/Modal/TopTireDetailsModal';
import ProductListing from '~/components/global/ProductListing/ProductListing';
import { SiteCatalogProductGroupItem } from '~/data/models/SiteCatalogProductGroupList';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { CSSStylesProp } from '~/lib/constants';

import BaseLink from '../Link/BaseLink';
import styles from './ProductGroupList.styles';

export interface ProductGroupListProps extends SiteCatalogProductGroupItem {
  customHeaderStyles?: CSSStylesProp;
  customItemStyles?: CSSStylesProp;
  isTopPicksGroup?: boolean;
  onClick?: (params: Record<string, string>) => void;
  siteCatalogSummary?: SiteCatalogSummary;
}

function ProductGroupList({
  description,
  name,
  productList,
  icon,
  siteQueryParams,
  isTopPicksGroup = false,
  customHeaderStyles,
  onClick,
  customItemStyles,
  siteCatalogSummary,
}: ProductGroupListProps) {
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);

  const isHeadingButton = onClick && siteQueryParams;
  const HeadingEl = isHeadingButton ? 'button' : BaseLink;
  function handleHeadingClick(filters: Record<string, string>) {
    return () => onClick && onClick(filters);
  }

  function openTopTireDetails(index: number) {
    setSelectedProductIndex(index);
  }

  function closeTopTireDetails() {
    setSelectedProductIndex(-1);
  }

  function Heading() {
    return (
      <>
        {name}{' '}
        {icon && (
          <span css={styles.brand}>
            <IconOrImage {...icon} />
          </span>
        )}
      </>
    );
  }

  return (
    <>
      <Grid data-testid="product-group-list">
        <GridItem css={customHeaderStyles}>
          <h2 css={styles.title}>
            {siteQueryParams ? (
              <HeadingEl
                href={`?${new URLSearchParams(siteQueryParams).toString()}`}
                onClick={handleHeadingClick(siteQueryParams)}
                css={styles.link}
              >
                {<Heading />}
                <Icon css={styles.linkIcon} name={ICONS.CHEVRON_RIGHT} />
              </HeadingEl>
            ) : (
              <Heading />
            )}
          </h2>
          <p css={styles.description}>{description}</p>
        </GridItem>
      </Grid>
      <div css={styles.wrapper}>
        <Carousel
          wrapperClass="product-carousel"
          params={{ mousewheel: { forceToAxis: true } }}
          freeScroll
        >
          {productList.map((product, i) => {
            return (
              <div key={`${name}-${i}`} css={[styles.item, customItemStyles]}>
                <ProductListing
                  index={i}
                  product={product}
                  imageList={product?.imageList || []}
                  isTopPicksGroup={isTopPicksGroup}
                  isGrouped
                  openTopTireDetails={openTopTireDetails}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      {isTopPicksGroup && siteCatalogSummary && selectedProductIndex >= 0 && (
        <TopTireDetailsModal
          index={selectedProductIndex}
          isOpen={selectedProductIndex >= 0}
          pick={
            siteCatalogSummary.siteCatalogSummaryTopPicksList[
              selectedProductIndex
            ]
          }
          onClose={closeTopTireDetails}
          onAfterClose={closeTopTireDetails}
        />
      )}
    </>
  );
}

export default ProductGroupList;
