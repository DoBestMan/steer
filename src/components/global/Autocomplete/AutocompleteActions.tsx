import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';

import styles from './Autocomplete.styles';

interface SearchOrClearIconProps {
  clearSearchComponent: string | JSX.Element;
  icon?: IconType;
  onClick: () => void;
  value: string;
}

function AutocompleteActions({
  clearSearchComponent,
  icon,
  onClick,
  value,
}: SearchOrClearIconProps) {
  if (value) {
    return (
      <button onClick={onClick} css={styles.clearSearch}>
        {clearSearchComponent}
      </button>
    );
  }

  return icon ? <Icon name={icon} css={styles.actionIcon} /> : null;
}

export default AutocompleteActions;
