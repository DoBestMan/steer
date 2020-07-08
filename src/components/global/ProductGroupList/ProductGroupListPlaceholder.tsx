import placeholders from '~/styles/placeholders';

import Carousel from '../Carousel/CarouselDynamic';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import ProductListingPlaceholder from '../ProductListing/ProductListingPlaceholder';
import styles from './ProductGroupList.styles';

const placeholdersList = Array(8).fill({});

function ProductGroupListPlaceholder() {
  return (
    <>
      <Grid>
        <GridItem>
          <div css={[placeholders.text, { height: 40, width: 300 }]} />
          <div css={[placeholders.text, { height: 20, width: 200 }]} />
        </GridItem>
      </Grid>
      <div css={styles.wrapper}>
        <Carousel
          wrapperClass="product-carousel"
          params={{ mousewheel: { forceToAxis: true } }}
          freeScroll
        >
          {placeholdersList.map((_, i) => (
            <div key={i} css={styles.item}>
              <ProductListingPlaceholder />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default ProductGroupListPlaceholder;
