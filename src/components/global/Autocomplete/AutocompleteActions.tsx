import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Autocomplete.styles';

interface SearchOrClearIconProps {
  onClick: () => void;
  value: string;
}

function AutocompleteActions({ onClick, value }: SearchOrClearIconProps) {
  if (value) {
    return (
      <button onClick={onClick} css={styles.clearSearch}>
        {ui('search.cancelButtonClear')}
      </button>
    );
  }
  return <Icon name={ICONS.SEARCH} css={styles.searchIcon} />;
}

export default AutocompleteActions;
