import { Quantity } from '~/components/pages/ProductDetail/ProductDetail.context';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';

import RoadHazardModal from './RoadHazardModal';

interface Props {
  addToCart: ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => void;
  durationLabel: string;
  isAddingToCart: boolean;
  isOpen: boolean;
  onClose: () => void;
  price: string;
  product?: SiteCatalogProductItem;
  quantity?: Quantity;
}

function RoadHazardModalContainer({
  durationLabel,
  isOpen,
  price,
  onClose,
  addToCart,
  isAddingToCart,
  product,
  quantity,
}: Props) {
  return (
    <RoadHazardModal
      durationLabel={durationLabel}
      isOpen={isOpen}
      onClose={onClose}
      price={price}
      addToCart={addToCart}
      isAddingToCart={isAddingToCart}
      product={product}
      quantity={quantity}
    />
  );
}

export default RoadHazardModalContainer;
