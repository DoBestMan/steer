import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS } from '~/lib/constants';

import AddTire from './AddTire';
import ProductToCompare from './ProductToCompare';
import { mockProduct } from './ProductToCompare.data';

export default {
  component: ProductToCompare,
  title: 'Compare/ProductToCompare',
};

export function ProductToCompareDefault() {
  const onClose = action('remove-product-from-list');
  const handleRemovingIndex = action('set-removing-product-index');

  return (
    <Grid>
      <GridItem
        gridColumnS={'2/4'}
        gridColumnM={'2/4'}
        gridColumnL={'2/5'}
        css={{ background: COLORS.GLOBAL.ORANGE }}
      >
        <div css={{ width: '110px' }}>
          <ProductToCompare
            index={1}
            onClose={onClose}
            product={mockProduct}
            setRemovingProductIndex={handleRemovingIndex}
          />
        </div>
      </GridItem>
    </Grid>
  );
}

export function AddTireWithKnobs() {
  const onAddTire = action('add-tire-to-list');

  return (
    <Grid>
      <GridItem
        gridColumnS={'2/4'}
        gridColumnM={'2/4'}
        gridColumnL={'2/5'}
        css={{ background: COLORS.GLOBAL.ORANGE }}
      >
        <div css={{ width: '110px' }}>
          <AddTire
            onAddTire={onAddTire}
            isDisabled={boolean('Disabled Button', false)}
          />
        </div>
      </GridItem>
    </Grid>
  );
}
