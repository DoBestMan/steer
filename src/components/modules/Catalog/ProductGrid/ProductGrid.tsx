import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import ProductListing from '~/components/global/ProductListing/ProductListing';
import ProductListingPlaceholder from '~/components/global/ProductListing/ProductListingPlaceholder';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

interface Props {
  isLoading?: boolean;
  placeholders?: number;
  productList: SiteCatalogProductItem[];
}

const HIGHLIGHT_PATTERNS = {
  [BREAKPOINT_SIZES.S]: {
    MULTIPLIER: 9,
    OFFSET: 4,
  },
  [BREAKPOINT_SIZES.M]: {
    MULTIPLIER: 7,
    OFFSET: 3,
  },
  [BREAKPOINT_SIZES.L]: {
    MULTIPLIER: 11,
    OFFSET: 4,
  },
  [BREAKPOINT_SIZES.XL]: {
    MULTIPLIER: 11,
    OFFSET: 4,
  },
};

function ProductGrid({ productList }: Props) {
  const { bk } = useBreakpoints();

  return (
    <Grid>
      <GridItem gridColumn="start/end" isGrid>
        {productList.map((product, i) => {
          if (product === null) {
            return (
              <GridItem
                gridColumn={'span 2'}
                gridColumnM={'span 2'}
                gridColumnL={'span 3'}
                key={i}
              >
                <ProductListingPlaceholder />
              </GridItem>
            );
          }
          const pattern = HIGHLIGHT_PATTERNS[bk];
          const isHighlighted = (i - pattern.OFFSET) % pattern.MULTIPLIER === 0;
          return (
            <GridItem
              gridColumn={isHighlighted ? 'span 4' : 'span 2'}
              gridColumnM={isHighlighted ? 'span 6' : 'span 2'}
              gridColumnL={isHighlighted ? 'span 6' : 'span 3'}
              key={`${product.name}-${i}`}
            >
              <ProductListing
                {...product}
                isHighlighted={isHighlighted}
                imageList={product.imageList}
              />
            </GridItem>
          );
        })}
      </GridItem>
    </Grid>
  );
}

export default ProductGrid;
