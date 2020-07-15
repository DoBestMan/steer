import Image from '~/components/global/Image/Image';
import Modal from '~/components/global/Modal/Modal';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { MODAL_THEME, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './HowToModal.styles';
import { HowToModalProps } from './Modal.types';

interface Props extends HowToModalProps {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
  isOpen: boolean;
  onAfterClose: () => void;
  onClose: () => void;
}

function HowToModal({
  alternateSearch,
  customerServiceNumber,
  eyebrow,
  imageAlt,
  imageSrc,
  isCustomerServiceEnabled,
  isOpen,
  modalLabel,
  onClose,
  onAfterClose,
  steps,
  title,
}: Props) {
  const { lessThan } = useBreakpoints();

  const supportHeading = isCustomerServiceEnabled
    ? ui('support.enabled')
    : ui('support.disabled');

  return (
    <Modal
      contentLabel={modalLabel}
      theme={MODAL_THEME.DARK}
      isFullscreen={lessThan.L}
      onClose={onClose}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
    >
      <div css={styles.container}>
        <p css={styles.eyebrow}>{eyebrow}</p>
        <h2 css={styles.title}>{title}</h2>
        <ol css={styles.stepList}>
          {steps.map((step, i) => (
            <li key={i} css={styles.stepItem}>
              {step}
            </li>
          ))}
        </ol>
        <div css={styles.imageWrapper}>
          <Image css={styles.image} src={imageSrc} altText={imageAlt} />
        </div>
        <div css={styles.alternateSearch}>
          <h3 css={styles.alternateSearchTitle}>{alternateSearch.title}</h3>
          <p css={styles.alternateSearchCopy}>{alternateSearch.copy}</p>
        </div>
        <div css={styles.supportPrompt}>
          <h3 css={styles.supportPromptTitle}>{supportHeading}</h3>
          <div css={styles.supportPromptButton}>
            <PhoneSupport
              customerServiceNumber={customerServiceNumber}
              isCustomerServiceEnabled={isCustomerServiceEnabled}
              theme={THEME.DARK}
            />
          </div>
          <div css={styles.supportPromptButton}>
            <EmailSupport
              isCustomerServiceEnabled={isCustomerServiceEnabled}
              theme={THEME.DARK}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default HowToModal;
