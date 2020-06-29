import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import BaseLink from '~/components/global/Link/BaseLink';
import ProductListing from '~/components/global/ProductListing/ProductListing';
import { SiteCatalogProductGroup } from '~/data/models/SiteCatalogProductGroupList';

import styles from './ProductGroupList.styles';

function ProductGroupList({
  description,
  name,
  productList,
  icon,
  siteQueryParams,
}: SiteCatalogProductGroup) {
  const url =
    siteQueryParams && `?${new URLSearchParams(siteQueryParams).toString()}`;

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
        <GridItem>
          <h2 css={styles.title}>
            {url ? (
              <BaseLink css={styles.link} href={url}>
                {<Heading />}
                <Icon css={styles.linkIcon} name={ICONS.CHEVRON_RIGHT} />
              </BaseLink>
            ) : (
              <Heading />
            )}
          </h2>
          <p css={styles.description}>{description}</p>
        </GridItem>
      </Grid>
      <Carousel freeScroll>
        {productList.map((product, i) => (
          <div key={`${name}-${i}`} css={styles.item}>
            <ProductListing {...product} />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default ProductGroupList;
