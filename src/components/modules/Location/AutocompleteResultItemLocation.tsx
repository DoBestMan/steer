import { ResultItemProps } from '~/components/global/Autocomplete/Autocomplete';
import { getItemDOMId } from '~/components/global/Autocomplete/Autocomplete.utils';
import AutocompleteResultsItem from '~/components/global/Autocomplete/AutocompleteResultItem';

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
      >
        <span css={styles.listboxItemHighlight}>{inputValue}</span>
        {main.replace(inputValue, '')}{' '}
        {secondary && (
          <span css={styles.listboxItemSecondary}>{secondary}</span>
        )}
      </button>
    </AutocompleteResultsItem>
  );
}

export default AutocompleteResultItemLocation;
