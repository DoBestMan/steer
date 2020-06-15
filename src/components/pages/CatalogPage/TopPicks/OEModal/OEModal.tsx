import Button from '~/components/global/Button/Button';
import Markdown from '~/components/global/Markdown/Markdown';
import Modal from '~/components/global/Modal/Modal';
import { SiteCatalogSummaryTopPickItemAdditionalInfo } from '~/data/models/SiteCatalogSummaryTopPickItemAdditionalInfo';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { MODAL_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { styles } from './OEModal.styles';

interface Props {
  content: SiteCatalogSummaryTopPickItemAdditionalInfo;
  isOpen: boolean;
  onClose: () => void;
}

function OEModal(props: Props) {
  const { isOpen, onClose, content } = props;
  const { title } = content;
  const { lessThan } = useBreakpoints();

  return (
    <Modal
      contentLabel={title}
      theme={MODAL_THEME.DARK}
      isFullscreen={lessThan.L}
      onClose={onClose}
      isOpen={isOpen}
    >
      <h2 css={styles.title}>{title}</h2>

      <div css={styles.contentSection}>
        <Markdown>{content.content}</Markdown>
      </div>

      <h3 css={[typography.eyebrow, styles.eyebrow]}>{content.table.title}</h3>

      <ul>
        {content.table.items.map((item) => {
          return (
            <li
              key={item.label}
              css={[typography.smallCopyTight, styles.specItem]}
            >
              <span css={styles.specItemLabel}>{item.label}</span>
              <span css={styles.specItemValue}>{item.value}</span>
            </li>
          );
        })}
      </ul>

      <Button onClick={onClose} css={styles.closeButton}>
        {ui('catalog.topPicks.oeModal.closeModalLabel')}
      </Button>
    </Modal>
  );
}

export default OEModal;
