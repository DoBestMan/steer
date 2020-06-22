import { useState } from 'react';

import { ui } from '~/lib/utils/ui-dictionary';

import RoadHazardModal, { CONSTANTS } from './RoadHazardModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function RoadHazardModalContainer({ isOpen, onClose }: Props) {
  const [shouldIntercept, setShouldIntercept] = useState(false);
  const [hasCoverage, setHasCoverage] = useState(CONSTANTS.HAS_COVERAGE);

  // TODO wire up API call and/or route change
  function goToCheckout() {
    console.info('Go to Checkout');
  }

  function handleConfirm(shouldGoToCheckout = true) {
    if (shouldGoToCheckout) {
      goToCheckout();
    } else {
      setShouldIntercept(true);
    }
  }

  function handleOnBack() {
    setShouldIntercept(false);
  }

  const copy = shouldIntercept
    ? ui('pdp.roadHazard.interceptCopy')
    : ui('pdp.roadHazard.headerCopy');
  const subtitle = shouldIntercept
    ? ui('pdp.roadHazard.interceptSubtitle')
    : ui('pdp.roadHazard.headerSubtitle');

  return (
    <RoadHazardModal
      copy={copy}
      hasCoverage={hasCoverage}
      setHasCoverage={setHasCoverage}
      isOpen={isOpen}
      subtitle={subtitle}
      onClose={onClose}
      onConfirm={handleConfirm}
      onBack={shouldIntercept ? handleOnBack : undefined}
      shouldDisplayOptions={!shouldIntercept}
    />
  );
}

export default RoadHazardModalContainer;
