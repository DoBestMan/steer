import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';

import RoadHazardModal from './RoadHazardModal';

interface Props {
  durationLabel: string;
  isOpen: boolean;
  onClose: () => void;
  price: string;
}

function RoadHazardModalContainer({
  durationLabel,
  isOpen,
  price,
  onClose,
}: Props) {
  const { addToCart } = useProductDetailContext();

  function handleConfirm(hasCoverage: boolean) {
    addToCart({ shouldAddCoverage: hasCoverage });
  }

  return (
    <RoadHazardModal
      durationLabel={durationLabel}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      price={price}
    />
  );
}

export default RoadHazardModalContainer;
