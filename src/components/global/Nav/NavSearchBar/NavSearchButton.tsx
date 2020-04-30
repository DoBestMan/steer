import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './NavSearchButton.styles';

// TODO: Add onClick to open search modal

function NavSearchButton() {
  return (
    <button
      css={[typography.primarySubhead, styles.button]}
      aria-label={ui('common.modal.open', { moduleName: 'search' })}
      type="button"
    >
      <Icon css={styles.icon} name={ICONS.SEARCH} aria-hidden="true" />
    </button>
  );
}

export default NavSearchButton;
