import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { COLORS } from '~/lib/constants';

import ListToCompare from './ListToCompare';
import mockProduct from './ListToCompare.data';

export default {
  component: ListToCompare,
  title: 'Compare/ListToCompare',
};

export function CompareToListWithKnobs() {
  const [productList, setProductList] = useState(Array(4).fill(mockProduct));

  const onRemove = (productId: string) => {
    const temp = productList.filter((item) => item.productId !== productId);

    setProductList(temp);
  };

  const onAddTire = () => {
    setProductList((original) => [...original, mockProduct]);
  };

  function onClick() {
    return () => action('Heading click');
  }
  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.ORANGE }}>
      <ListToCompare
        onClick={onClick}
        productList={productList}
        onAddTire={onAddTire}
        onRemove={onRemove}
        setRemovingProductIndex={action('set-removing-product-index')}
      />
    </div>
  );
}
