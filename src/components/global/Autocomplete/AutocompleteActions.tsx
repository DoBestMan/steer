import styles from './Autocomplete.styles';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

interface SearchOrClearIconProps {
  onClick: () => void;
  value: string;
}

function AutocompleteActions({ onClick, value }: SearchOrClearIconProps) {
  if (value) {
    return (
      <Button aria-label="cancel" onClick={onClick}>
        <Icon name={ICONS.CLEAR_SEARCH} css={styles.clearSearchIcon} />
      </Button>
    );
  }
  return <Icon name={ICONS.SEARCH} css={styles.searchIcon} />;
}

export default AutocompleteActions;
