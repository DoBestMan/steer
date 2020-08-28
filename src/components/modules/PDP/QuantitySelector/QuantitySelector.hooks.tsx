import { useCallback, useEffect, useState } from 'react';

import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { formatDollars } from '~/lib/utils/string';

interface QuantitySelectorContainerProps {
  isFrontAndRear?: boolean;
  onChangeQuantity: (values: { front: number; rear?: number }) => void;
  rearPrice?: string;
  tirePrice: string;
  toggleModal: () => void;
}

interface UseQuantitySelectorContainerProps {
  finalPrice: {
    front: string;
    rear?: string;
  };
  numbers: number[];
  onConfirm: () => void;
  onInterceptAction: (value: number) => void;
  onSelectFrontPicker: (value: number, index: number) => void;
  onSelectRearPicker: (value: number, index: number) => void;
  quantity: number;
  recommendedQuantity: number;
  selectedFrontIndex: number;
  selectedRearIndex?: number;
}

const CONSTANTS = {
  PICKER_NUMBERS: Array.from(Array(16).keys()).map((item) => item + 1),
  QUANTITIES_TO_INTERCEPT: [1, 3],
  RECOMMENDED_QUANTITY: [2, 4],
};

function calculatePrice({
  tirePrice,
  rearPrice,
  quantity,
  rearQuantity,
}: {
  quantity: number;
  rearPrice?: string;
  rearQuantity?: number;
  tirePrice: string;
}): {
  front: string;
  rear?: string;
} {
  const finalTirePrice = quantity ? quantity * parseInt(tirePrice, 10) : 0;
  const finalRearPrice =
    rearPrice && rearQuantity ? rearQuantity * parseInt(rearPrice, 10) : 0;

  return {
    front: formatDollars(finalTirePrice),
    rear: formatDollars(finalRearPrice),
  };
}

function useQuantitySelectorContainer({
  isFrontAndRear,
  onChangeQuantity,
  rearPrice,
  tirePrice,
  toggleModal,
}: QuantitySelectorContainerProps): UseQuantitySelectorContainerProps {
  const { quantity: initialQuantity } = useProductDetailContext();
  const [quantity, setQuantity] = useState(initialQuantity.front);
  const [rearQuantity, setRearQuantity] = useState(initialQuantity.rear);
  const [finalPrice, setFinalPrice] = useState(
    calculatePrice({ tirePrice, rearPrice, quantity, rearQuantity }),
  );
  const [selectedFrontIndex, setSelectedFrontIndex] = useState(0);
  const [selectedRearIndex, setSelectedRearIndex] = useState(0);
  const [recommendedQuantity, setRecommendedQuantity] = useState(0);

  const numbers = CONSTANTS.PICKER_NUMBERS;

  useEffect(() => {
    setQuantity(initialQuantity.front);
    setRearQuantity(initialQuantity.rear);

    setSelectedFrontIndex(initialQuantity.front - 1);
    if (initialQuantity.rear) {
      setSelectedRearIndex(initialQuantity.rear - 1);
    }
  }, [initialQuantity]);

  const onSelectFrontPicker = useCallback(
    (value: number, index: number) => {
      setQuantity(value);
      setFinalPrice(
        calculatePrice({ tirePrice, rearPrice, quantity, rearQuantity }),
      );
      setSelectedFrontIndex(index);
    },
    [
      setQuantity,
      setFinalPrice,
      setSelectedFrontIndex,
      tirePrice,
      rearPrice,
      quantity,
      rearQuantity,
    ],
  );

  const onSelectRearPicker = useCallback(
    (value: number, index: number) => {
      setRearQuantity(value);
      setFinalPrice(
        calculatePrice({ tirePrice, rearPrice, quantity, rearQuantity }),
      );
      setSelectedRearIndex(index);
    },
    [
      setRearQuantity,
      setSelectedRearIndex,
      tirePrice,
      rearPrice,
      quantity,
      rearQuantity,
    ],
  );

  function onInterceptAction(value: number) {
    setRecommendedQuantity(0);

    if (CONSTANTS.QUANTITIES_TO_INTERCEPT.includes(value)) {
      onChangeQuantity({ front: quantity, rear: rearQuantity });
      toggleModal();
      return;
    }

    onSelectFrontPicker(value, value - 1);
  }

  function onConfirm() {
    const interceptQuantity =
      !isFrontAndRear &&
      CONSTANTS.QUANTITIES_TO_INTERCEPT.find((item) => item === quantity);

    if (interceptQuantity) {
      const followingRecommendedQuantity = CONSTANTS.RECOMMENDED_QUANTITY.find(
        (item) => item > quantity,
      );
      setRecommendedQuantity(followingRecommendedQuantity || 0);
      return;
    }

    onChangeQuantity({ front: quantity, rear: rearQuantity });
    toggleModal();
  }

  return {
    finalPrice,
    numbers,
    onConfirm,
    onInterceptAction,
    onSelectFrontPicker,
    onSelectRearPicker,
    quantity,
    recommendedQuantity,
    selectedFrontIndex,
    selectedRearIndex,
  };
}

export default useQuantitySelectorContainer;
