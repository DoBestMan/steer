import { action } from '@storybook/addon-actions';
import { useEffect, useState } from 'react';

import { mockProductList } from '../ListToCompare/ListToCompare.data';
import CompareDrawer from './CompareDrawer';

export default {
  component: CompareDrawer,
  title: 'Compare/CompareDrawer',
};

export function CompareDrawerDefault() {
  const [open, setOpen] = useState<boolean>(false);
  const [showDupAlert, setShowDupAlert] = useState<boolean>(false);
  const [productList, setProductList] = useState(mockProductList);
  const [hide, setHide] = useState<boolean>(false);

  useEffect(() => {
    if (productList.length < 1) {
      setHide(true);
    }
  }, [productList]);

  const onRemove = (productId: string) => {
    const temp = productList.filter(
      (product) => product.productId !== productId,
    );
    setProductList(temp);
  };

  const onAddTire = () => {
    setOpen(false);
  };

  const onToggle = () => {
    setOpen((state) => !state);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CompareDrawer
        hide={hide}
        title={'Compare Tires'}
        subtitle={'Add 2 to 5 tires to see side by side'}
        open={open}
        onClose={onClose}
        onToggle={onToggle}
        productList={productList}
        isDisabled={2 > productList.length || 5 < productList.length}
        onRemove={onRemove}
        onAddTire={onAddTire}
        onCompare={action('handle-compare')}
        setRemovingProductIndex={action('set-removing-product-index')}
        setShowDupAlert={setShowDupAlert}
        showDupAlert={showDupAlert}
      />
    </div>
  );
}
