import { getItemDOMId } from './Autocomplete.utils';

import styles from './Autocomplete.styles';

import Button from '~/components/global/Button/Button';

interface Props {
  index: number;
  inputValue: string;
  listboxItemID: string;
  onItemSelected: (index: number, shouldFocusInput?: boolean) => void;
  result: string;
  selectedIndex: number;
}

function AutocompleteResultsItem({
  index,
  inputValue,
  listboxItemID,
  onItemSelected,
  result,
  selectedIndex,
}: Props) {
  const isSelected = index === selectedIndex;
  const id = getItemDOMId(listboxItemID, result);
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
      <Button onClick={handleItemClicked}>{result}</Button>
    </li>
  );
}

export default AutocompleteResultsItem;
