import { ResultItemProps } from '~/components/global/Autocomplete/Autocomplete';
import { getItemDOMId } from '~/components/global/Autocomplete/Autocomplete.utils';
import AutocompleteResultsItem from '~/components/global/Autocomplete/AutocompleteResultItem';
import Button from '~/components/global/Button/Button';
import { BUTTON_STYLE, THEME } from '~/lib/constants';

import styles from './AutocompleteResultItemLocation.styles';

function AutocompleteResultItemLocation({
  index,
  inputValue,
  listboxItemID,
  onItemSelected,
  result,
  selectedIndex,
}: ResultItemProps) {
  const { main, secondary } = result;
  const isSelected = index === selectedIndex;
  const id = getItemDOMId(listboxItemID, main);
  const handleItemClicked = () => {
    onItemSelected(index, true);
  };
  const ButtonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };
  const ButtonLabel = 'Select';
  return (
    <AutocompleteResultsItem
      id={id}
      aria-label={`${main} ${secondary && secondary}`}
      aria-selected={isSelected}
      css={styles.listboxItem}
      role="option"
    >
      <button
        tabIndex={-1}
        onClick={handleItemClicked}
        data-testid="location-result"
        css={[styles.listBoxButton, isSelected && styles.listboxItemSelected]}
        style={ButtonStyle}
      >
        <div>
          <span css={styles.listboxItemHighlight}>{inputValue}</span>
          {main.replace(inputValue, '')}{' '}
          {secondary && (
            <span css={styles.listboxItemSecondary}>{secondary}</span>
          )}
        </div>
        <div>
          <Button
            css={styles.button}
            style={BUTTON_STYLE.OUTLINED}
            theme={THEME.LIGHT}
          >
            {ButtonLabel}
          </Button>
        </div>
      </button>
    </AutocompleteResultsItem>
  );
}

export default AutocompleteResultItemLocation;
