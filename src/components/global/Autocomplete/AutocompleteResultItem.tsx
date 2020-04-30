import Button from '~/components/global/Button/Button';

import styles from './Autocomplete.styles';
import { getItemDOMId } from './Autocomplete.utils';

export type AutocompleteResult = {
  main: string;
  secondary: string;
};

interface Props extends AutocompleteResult {
  index: number;
  inputValue: string;
  listboxItemID: string;
  onItemSelected: (index: number, shouldFocusInput?: boolean) => void;
  selectedIndex: number;
}

function AutocompleteResultsItem({
  index,
  inputValue,
  listboxItemID,
  main,
  onItemSelected,
  secondary,
  selectedIndex,
}: Props) {
  const isSelected = index === selectedIndex;
  const id = getItemDOMId(listboxItemID, main);
  const handleItemClicked = () => {
    onItemSelected(index, true);
  };
  return (
    <li
      aria-selected={isSelected}
      css={[styles.listboxItem, isSelected && styles.listboxItemSelected]}
      id={id}
      role="option"
    >
      <span aria-hidden="true" css={styles.listboxItemHighlight}>
        {inputValue}
      </span>
      <Button tabIndex={-1} onClick={handleItemClicked}>
        <>
          {main}
          {secondary && (
            <span css={styles.listboxItemSecondary}>{secondary}</span>
          )}
        </>
      </Button>
    </li>
  );
}

export default AutocompleteResultsItem;
