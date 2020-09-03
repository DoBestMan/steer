import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import ProductListing from '~/components/global/ProductListing/ProductListing';
import { SiteCatalogProductGroupItem } from '~/data/models/SiteCatalogProductGroupList';
import { CSSStylesProp } from '~/lib/constants';

import BaseLink from '../Link/BaseLink';
import styles from './ProductGroupList.styles';

export interface ProductGroupListProps extends SiteCatalogProductGroupItem {
  customHeaderStyles?: CSSStylesProp;
  customItemStyles?: CSSStylesProp;
  onClick?: (params: Record<string, string>) => void;
}

function ProductGroupList({
  description,
  name,
  productList,
  icon,
  siteQueryParams,
  customHeaderStyles,
  onClick,
  customItemStyles,
}: ProductGroupListProps) {
  const isHeadingButton = onClick && siteQueryParams;
  const HeadingEl = isHeadingButton ? 'button' : BaseLink;
  function handleHeadingClick(filters: Record<string, string>) {
    return () => onClick && onClick(filters);
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
      <Grid>
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
                  product={product}
                  imageList={product?.imageList || []}
                  isGrouped
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default ProductGroupList;
