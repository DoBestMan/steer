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
  return (
    <RoadHazardModal
      durationLabel={durationLabel}
      isOpen={isOpen}
      onClose={onClose}
      price={price}
    />
  );
}

export default RoadHazardModalContainer;
