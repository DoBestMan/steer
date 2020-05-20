import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './NavSearchButton.styles';

function NavSearchButton() {
  const { toggleIsSearchOpen } = useSearchContext();
  return (
    <button
      aria-label={ui('common.modal.open', { moduleName: 'search' })}
      css={[typography.primarySubhead, styles.button]}
      onClick={toggleIsSearchOpen}
      type="button"
    >
      <Icon css={styles.icon} name={ICONS.SEARCH} aria-hidden="true" />
    </button>
  );
}

export default NavSearchButton;
