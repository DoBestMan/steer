import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
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
      hasDefaultPadding={false}
      theme={MODAL_THEME.DARK}
      isFullscreen={lessThan.L}
      onClose={onClose}
      isOpen={isOpen}
    >
      <Grid css={styles.container}>
        <GridItem gridColumnL="1/13">
          <h2 css={styles.title}>{title}</h2>

          <div css={styles.contentSection}>
            <Markdown>{content.content}</Markdown>
          </div>
        </GridItem>

        <GridItem gridColumnL="1/13">
          <h3 css={[typography.eyebrow, styles.eyebrow]}>
            {content.table.title}
          </h3>
        </GridItem>

        <GridItem isGrid as="ul" gridColumnL="1/13">
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
        </GridItem>

        <GridItem gridColumnL="1/13">
          <Button onClick={onClose} css={styles.closeButton}>
            {ui('catalog.topPicks.oeModal.closeModalLabel')}
          </Button>
        </GridItem>
      </Grid>
    </Modal>
  );
}

export default OEModal;
