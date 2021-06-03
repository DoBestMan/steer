import React, { useEffect, useState } from 'react';

import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import Link from '~/components/global/Link/Link';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import { ConfirmFitDecisionModalData } from '~/data/models/ConfirmFitDecisionModalData';
import { THEME, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  checkDecisionModalLabel,
  confirmFitDecisionModal,
} from '../ConfirmFitInsight/ConfirmFitInsight.utils';
import styles from './ConfirmFitDecisionModal.styles';

interface ConfirmFitModalProps {
  data: ConfirmFitDecisionModalData | null;
  isOpen: boolean;
  onClose: () => void;
  openVehicleSelector: () => void;
}

function ConfirmFitDecisionModal({
  data,
  isOpen,
  onClose,
  openVehicleSelector,
}: ConfirmFitModalProps) {
  const [
    shouldReloadAfterDecisionModal,
    setReloadAfterDecisionModal,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (data?.labelLink?.label) {
      const reloadAfterDecision = checkDecisionModalLabel(
        data?.labelLink?.label,
      );
      setReloadAfterDecisionModal(reloadAfterDecision);
    }
  }, [data]);

  const closeDecisionFitModal = () => {
    onClose();
    const pathName = window.location.pathname.substr(1);
    if (shouldReloadAfterDecisionModal && pathName !== 'paid') {
      setTimeout(() => {
        window.location.reload();
      }, TIME.MS1000);
    }
  };
  const handleVehicleSelector = () => {
    onClose();
    openVehicleSelector();
  };

  function handleRender() {
    if (!data) {
      return null;
    }
    const { icon, header, title, subTitle, labelLink } = data;
    const { label, link } = labelLink;

    return (
      <>
        <FeaturedInfoModule
          copy={subTitle}
          icon={icon}
          featureDescription={header}
          title={title}
        />
        <div
          data-component={
            shouldReloadAfterDecisionModal
              ? 'changeTireSize-component'
              : 'viewTiresThatFit-component'
          }
          css={styles.detailsContainer}
        >
          <Link
            key={label}
            href={link.href}
            theme={THEME.DARK}
            css={[styles.labelText]}
            isExternal={link.isExternal}
            onClick={closeDecisionFitModal}
          >
            {label}
          </Link>
          <h1
            data-component="select-another-vehicle"
            onClick={handleVehicleSelector}
            css={[styles.labelText]}
          >
            {ui('pdp.insights.fitting.selectAnotherVehicle')}
          </h1>
        </div>
      </>
    );
  }

  return (
    <BottomCardModal
      contentLabel={confirmFitDecisionModal}
      customContentStyles={styles.modalContent}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={[modalContainerStyles.container]}>{handleRender()}</div>
    </BottomCardModal>
  );
}

export default ConfirmFitDecisionModal;
