import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './QuantitySelector.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function QuantitySelector({ isOpen, onClose, onConfirm }: Props) {
  return (
    <BottomCardModal
      contentLabel={ui('pdp.quantitySelector.modalLabel')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div css={styles.container}>
        <Icon name={ICONS.QUANTITY_SELECTOR_CAR} css={styles.icon} />
        <h2 css={styles.title}>{ui('pdp.quantitySelector.title')}</h2>

        <h3 css={styles.cta}>
          <Markdown>{ui('pdp.quantitySelector.cta')}</Markdown>
        </h3>
        <div css={styles.copy}>
          <Markdown>{ui('pdp.quantitySelector.copy')}</Markdown>
        </div>

        {/* TODO add quantity Selector Carousel here when available */}

        <Button
          css={styles.confirmButton}
          onClick={onConfirm}
          theme={BUTTON_THEME.LIGHT}
        >
          {ui('pdp.quantitySelector.confirmButtonLabel')}
        </Button>
      </div>
    </BottomCardModal>
  );
}

export default QuantitySelector;
