import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import { ModalContextProps } from '~/context/Modal.context';
import { THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';

import styles from './PurchaseIncludesCard.styles';

export interface Props {
  description: string;
  icon: IconType;
  linkLabel: string;
  modalId: STATIC_MODAL_IDS;
  title: string;
}

function PurchaseIncludesCard({
  description,
  icon,
  linkLabel,
  modalId,
  openStaticModal,
  title,
}: Props & Pick<ModalContextProps, 'openStaticModal'>) {
  function openModal() {
    openStaticModal(modalId);
  }

  return (
    <>
      <Icon name={icon} css={styles.cardIcon} />
      <div css={styles.content}>
        <h2 css={styles.cardTitle}>{title}</h2>
        <p css={styles.cardCopy}>{description}</p>
      </div>
      <Link
        as="button"
        onClick={openModal}
        theme={THEME.LIGHT}
        css={styles.cardLink}
      >
        {linkLabel}
      </Link>
    </>
  );
}

export default PurchaseIncludesCard;
