import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import SearchLabel from '~/components/modules/Search/SearchLabel/SearchLabel';
import { BREAKPOINT_SIZES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './NavSearchButton.styles';

function NavSearchButton() {
  const { toggleIsSearchOpen } = useSearchContext();
  function handleToggleSearch() {
    toggleIsSearchOpen();
  }

  return (
    <button
      aria-label={ui('common.modal.open', { moduleName: 'search' })}
      css={[typography.primarySubhead, styles.button]}
      onClick={handleToggleSearch}
      type="button"
    >
      <Icon css={styles.icon} name={ICONS.SEARCH} aria-hidden="true" />
      <SearchLabel fullLabelAt={BREAKPOINT_SIZES.XL} />
    </button>
  );
}

export default NavSearchButton;
