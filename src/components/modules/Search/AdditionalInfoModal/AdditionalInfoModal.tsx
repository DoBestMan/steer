import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Modal from '~/components/global/Modal/Modal';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { LINK_THEME, MODAL_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './AdditionalInfoModal.styles';

interface AlternateSearch {
  copy: string;
  linkText: string;
  linkURL: string;
  title: string;
}

type Step = JSX.Element | string;

export interface AdditionalInfoModalContainerProps {
  alternateSearch: AlternateSearch;
  eyebrow: string;
  imageAlt: string;
  imageSrcLg: string;
  imageSrcSm: string;
  isOpen: boolean;
  modalLabel: string;
  onClose: () => void;
  steps: Step[];
  title: string;
}

interface Props extends AdditionalInfoModalContainerProps {
  isCustomerServiceEnabled: boolean;
}

function AdditionalInfoModal({
  alternateSearch,
  eyebrow,
  imageAlt,
  imageSrcLg,
  imageSrcSm,
  isCustomerServiceEnabled,
  isOpen,
  modalLabel,
  onClose,
  steps,
  title,
}: Props) {
  const { is, lessThan } = useBreakpoints();

  return (
    <Modal
      contentLabel={modalLabel}
      theme={MODAL_THEME.DARK}
      isFullscreen={lessThan.L}
      onClose={onClose}
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
          <Image
            css={styles.image}
            src={is.M ? imageSrcLg : imageSrcSm}
            altText={imageAlt}
          />
        </div>
        <div css={styles.alternateSearch}>
          <h3 css={styles.alternateSearchTitle}>{alternateSearch.title}</h3>
          <p css={styles.alternateSearchCopy}>{alternateSearch.copy}</p>
          <div css={styles.alternateSearchLinkWrapper}>
            <Link
              href={alternateSearch.linkURL}
              css={styles.alternateSearchLink}
              theme={LINK_THEME.DARK}
            >
              {alternateSearch.linkText}
            </Link>
          </div>
        </div>
        <div css={styles.supportPrompt}>
          <h3 css={styles.supportPromptTitle}>{ui('search.support')}</h3>
          <div css={styles.supportPromptButton}>
            <PhoneSupport
              isCustomerServiceEnabled={isCustomerServiceEnabled}
              theme={LINK_THEME.DARK}
            />
          </div>
          <div css={styles.supportPromptButton}>
            <EmailSupport
              isCustomerServiceEnabled={isCustomerServiceEnabled}
              theme={LINK_THEME.DARK}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AdditionalInfoModal;
