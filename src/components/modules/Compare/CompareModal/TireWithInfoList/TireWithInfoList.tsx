import { SiteCatalogProductItem } from '~/data/models//SiteCatalogProductItem';

import { NUMBER_OF_TIRES } from '../../Compare.constants';
import AddTire from '../../ProductToCompare/AddTire';
import TireWithInfo from './TireWithInfo';
import styles from './TireWithInfoList.styles';

interface Props {
  onAddTire: () => void;
  onRemove: (productId: string) => void;
  productList: SiteCatalogProductItem[];
  setRemovingProductIndex: (index: number) => void;
}

function TireWithInfoList({
  productList,
  onRemove,
  setRemovingProductIndex,
  onAddTire,
}: Props) {
  const onClose = (productId: string) => {
    onRemove(productId);
  };

  return (
    <div css={[styles.root, styles.background]}>
      {productList.map((product, index) => (
        <TireWithInfo
          key={`tire-with-info-${product.productId}-${product.size}-${index}`}
          index={index}
          product={product}
          onClose={onClose}
          setRemovingProductIndex={setRemovingProductIndex}
        />
      ))}
      {productList.length < NUMBER_OF_TIRES.MAX && (
        <div css={styles.addTire}>
          <AddTire onAddTire={onAddTire} isBig hasBackground />
        </div>
      )}
    </div>
  );
}

export default TireWithInfoList;
