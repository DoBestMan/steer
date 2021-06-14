import React from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Modal from '~/components/global/Modal/Modal';
import { MODAL_THEME, THEME } from '~/lib/constants';

import { BestPriceModalData } from './BestPriceGuaranteeModal.data';
import styles from './BestPriceGuaranteeModal.styles';

interface Props {
  data: BestPriceModalData;
  isOpen: boolean;
  onClose: () => void;
  requestPriceMatch: () => void;
}

function BestPriceGuanranteeModal({
  data,
  isOpen,
  onClose,
  requestPriceMatch,
}: Props) {
  const { title, descriptions, buttonTitle, subTitle } = data;
  return (
    <Modal
      contentLabel="best-price-guarantee"
      theme={MODAL_THEME.LIGHT}
      isFullscreen={false}
      isHalfscreen={false}
      hasCloseButton
      onClose={onClose}
      isOpen={isOpen}
    >
      <div css={styles.contentWrapper}>
        <h1 css={styles.title}>{title}</h1>
        <h3 css={styles.subTitle}>{subTitle}</h3>
        <Button
          theme={THEME.LIGHT}
          onClick={requestPriceMatch}
          css={styles.button}
        >
          <Icon name={ICONS.CUSTOMER_SUPPORT} css={styles.iconStyle}></Icon>
          {buttonTitle}
        </Button>
        <ul css={styles.description}>
          {descriptions.map((item, index) => (
            <li key={index} css={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default BestPriceGuanranteeModal;
