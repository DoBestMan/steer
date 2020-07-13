import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import Modal from '~/components/global/Modal/Modal';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { SiteDynamicModal } from '~/data/models/SiteDynamicModal';
import { MODAL_THEME, THEME } from '~/lib/constants';

import styles from './ContentModal.styles';

export type ModalContentProps = Omit<SiteDynamicModal, 'type'>;

export interface Props extends ModalContentProps {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
  isOpen: boolean;
  onAfterClose: () => void;
  onClose: () => void;
}

function ContentModal({
  content,
  customerServiceNumber,
  image,
  isCustomerServiceEnabled,
  isOpen,
  link,
  onClose,
  onAfterClose,
  showSupportSection = true,
  subtitle,
  title,
}: Props) {
  return (
    <Modal
      contentLabel={title}
      theme={MODAL_THEME.LIGHT}
      onClose={onClose}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
    >
      <div css={styles.container}>
        <h1 css={[styles.title, !subtitle && styles.noSubtitle]}>{title}</h1>
        {subtitle && <h2 css={styles.subtitle}>{subtitle}</h2>}

        {image && (
          <div css={styles.imageContainer}>
            <Image
              altText={image.altText || title}
              src={image.src}
              css={styles.hero}
              widths={[320, 600, 1000, 1500, 2000]}
            />
          </div>
        )}

        <div css={styles.contentContainer}>
          <Markdown>{content}</Markdown>

          {link && (
            <Link
              href={link.link.href}
              isExternal={link.link.isExternal}
              theme={THEME.LIGHT}
              css={styles.link}
            >
              {link.label}
            </Link>
          )}
        </div>
        {showSupportSection && (
          <div css={styles.supportContainer}>
            <SupportHeading
              css={styles.supportHeading}
              isCustomerServiceEnabled={isCustomerServiceEnabled}
            />
            <div css={styles.phoneSupport}>
              <PhoneSupport
                customerServiceNumber={customerServiceNumber}
                isCustomerServiceEnabled={isCustomerServiceEnabled}
              />
            </div>

            <EmailSupport isCustomerServiceEnabled={isCustomerServiceEnabled} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ContentModal;
