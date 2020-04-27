import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import AutocompleteActions from './AutocompleteActions';
import AutocompleteResultItem from './AutocompleteResultItem';
import { generateIDs, getItemDOMId } from './Autocomplete.utils';
import styles from './Autocomplete.styles';

import { KEYCODES } from '~/lib/constants';
import { randomString } from '~/lib/utils/string';

const CONSTANTS = {
  DEFAULT_SELECTED_INDEX: -1,
  DEFAULT_VALUE: '',
};

interface Props {
  errorLabel: string | JSX.Element;
  label: string;
  onChange: (value: string) => void;
  results: string[];
}

// Autocomplete combobox with listbox popup
// Based on:
// Approach: https://www.w3.org/TR/wai-aria-practices/#combobox
// Example: https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html (List Autocomplete with Automatic Selection)

function Autocomplete({ errorLabel, label, onChange, results }: Props) {
  const [ids, setIds] = useState({
    invalidID: '',
    labelID: '',
    listboxID: '',
    listboxItemID: '',
  });
  const [shouldShowListbox, setShouldShowListbox] = useState(false);
  const [value, setValue] = useState(CONSTANTS.DEFAULT_VALUE);
  const [activedescendant, setActivedescendant] = useState(
    CONSTANTS.DEFAULT_VALUE,
  );
  const [selectedIndex, setSelectedIndex] = useState(
    CONSTANTS.DEFAULT_SELECTED_INDEX,
  );
  const isInputEmpty = value.length < 1;
  const hasResults = results.length > 0;
  const isInvalidInput = !hasResults && !isInputEmpty;
  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIds(generateIDs(randomString(10)));
  }, []);

  useEffect(() => {
    setShouldShowListbox(hasResults && !isInputEmpty);
    setActivedescendant(
      isInvalidInput ? ids.invalidID : CONSTANTS.DEFAULT_VALUE,
    );

    setSelectedIndex(0);
  }, [hasResults, isInputEmpty, ids.invalidID, isInvalidInput, results]);

  const cancelSelection = () => {
    onChange(CONSTANTS.DEFAULT_VALUE);
    setSelectedIndex(CONSTANTS.DEFAULT_SELECTED_INDEX);
    setShouldShowListbox(false);
    setValue(CONSTANTS.DEFAULT_VALUE);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;

    onChange(targetValue);
    setValue(targetValue);
  };

  const selectIndex = (index: number) => {
    setActivedescendant(getItemDOMId(ids.listboxItemID, results[index]));
    setSelectedIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const lastIndex = results.length - 1;
    const nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
    const prevIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;

    switch (e.keyCode) {
      case KEYCODES.ARROW_DOWN:
        e.preventDefault();
        selectIndex(nextIndex);
        break;
      case KEYCODES.ARROW_UP:
        e.preventDefault();
        selectIndex(prevIndex);
        break;
      case KEYCODES.ENTER:
        if (hasResults) {
          onItemSelected(selectedIndex);
        }
        break;
      case KEYCODES.ESCAPE:
        cancelSelection();
        break;
      default:
        break;
    }
  };

  const onItemSelected = (index: number, shouldFocusInput?: boolean) => {
    setValue(results[index]);
    setActivedescendant(CONSTANTS.DEFAULT_VALUE);

    setSelectedIndex(-1);
    setShouldShowListbox(false);

    if (shouldFocusInput && textInput.current) {
      textInput.current.focus();
    }
  };

  return (
    <div css={styles.container}>
      <label
        id={ids.labelID}
        css={[styles.label, !!value && styles.labelHidden]}
      >
        {label}
      </label>

      <div css={styles.comboboxWrapper}>
        <div
          aria-expanded={shouldShowListbox}
          aria-haspopup="listbox"
          aria-owns={ids.listboxID}
          role="combobox"
        >
          <input
            aria-activedescendant={activedescendant}
            aria-autocomplete="list"
            aria-controls={ids.listboxID}
            aria-labelledby={ids.labelID}
            css={styles.input}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            ref={textInput}
            type="text"
            value={value}
          />
        </div>
        <ul
          aria-labelledby={ids.labelID}
          css={styles.listbox}
          id={ids.listboxID}
          role={shouldShowListbox ? 'listbox' : ''}
        >
          {shouldShowListbox &&
            results.map((result: string, index: number) => (
              <AutocompleteResultItem
                index={index}
                inputValue={value}
                key={result}
                listboxItemID={ids.listboxItemID}
                onItemSelected={onItemSelected}
                result={result}
                selectedIndex={selectedIndex}
              />
            ))}

          {isInvalidInput && (
            <li css={styles.listboxItem} id={ids.invalidID}>
              {errorLabel}
            </li>
          )}
        </ul>
      </div>

      <AutocompleteActions value={value} onClick={cancelSelection} />
    </div>
  );
}

export default Autocomplete;
