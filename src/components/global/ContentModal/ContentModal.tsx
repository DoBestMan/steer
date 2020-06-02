import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import Modal from '~/components/global/Modal/Modal';
import footerStyles from '~/components/modules/Footer/Footer.styles';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { LINK_THEME, MODAL_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

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
  subtitle: string;
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
      isFullscreen
      contentLabel={title}
      theme={MODAL_THEME.LIGHT}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div css={styles.container}>
        <h1 css={styles.title}>{title}</h1>
        <h2 css={styles.subtitle}>{subtitle}</h2>

        <div css={styles.imageContainer}>
          <Image
            altText={image.altText || title}
            srcSet={image.src}
            css={styles.hero}
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
          <Grid css={styles.supportContainer}>
            <GridItem
              gridColumnS="1/6"
              gridColumnM="1/8"
              gridColumnL="1/6"
              gridColumnXL="1/5"
              css={[typography.secondaryHeadline, footerStyles.supportSection]}
            >
              <SupportHeading
                isCustomerServiceEnabled={isCustomerServiceEnabled}
              />
            </GridItem>

            <GridItem
              as="ul"
              gridColumnS="1/6"
              gridColumnM="1/8"
              gridColumnL="6/14"
              gridColumnXL="5/14"
              isGrid
              css={footerStyles.supportSectionButtons}
            >
              <GridItem
                gridColumnM="1/4"
                gridColumnL="1/5"
                gridColumnXL="1/4"
                as="li"
                css={footerStyles.supportButton}
              >
                <PhoneSupport
                  isCustomerServiceEnabled={isCustomerServiceEnabled}
                />
              </GridItem>
              <GridItem
                gridColumnM="4/7"
                gridColumnL="5/9"
                gridColumnXL="4/7"
                as="li"
                css={footerStyles.supportButton}
              >
                <EmailSupport
                  isCustomerServiceEnabled={isCustomerServiceEnabled}
                />
              </GridItem>
            </GridItem>
          </Grid>
        )}
      </div>
    </Modal>
  );
}

export default ContentModal;
