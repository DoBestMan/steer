import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import Modal from '~/components/global/Modal/Modal';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { LINK_THEME, MODAL_THEME } from '~/lib/constants';

import styles from './ContentModal.styles';

export interface ModalContentProps {
  content: string;
  image: {
    altText: string;
    src: string;
  };

  link?: {
    label: string;
    link: {
      href: string;
      isExternal?: boolean;
    };
  };
  subtitle?: string;
  title: string;
}

export interface Props extends ModalContentProps {
  isCustomerServiceEnabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  showSupportSection?: boolean;
}

function ContentModal({
  content,
  image,
  isCustomerServiceEnabled,
  isOpen,
  link,
  onClose,
  showSupportSection = true,
  subtitle,
  title,
}: Props) {
  return (
    <Modal
      contentLabel={title}
      theme={MODAL_THEME.LIGHT}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div css={styles.container}>
        <h1 css={[styles.title, !subtitle && styles.noSubtitle]}>{title}</h1>
        {subtitle && <h2 css={styles.subtitle}>{subtitle}</h2>}

        <div css={styles.imageContainer}>
          <Image
            altText={image.altText || title}
            src={image.src}
            css={styles.hero}
            widths={[320, 600, 1000, 1500, 2000]}
          />
        </div>

        <div css={styles.contentContainer}>
          <Markdown>{content}</Markdown>

          {link && (
            <Link
              href={link.link.href}
              isExternal={link.link.isExternal}
              theme={LINK_THEME.LIGHT}
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
