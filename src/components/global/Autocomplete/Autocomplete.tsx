import {
  ChangeEvent,
  KeyboardEvent,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from 'react';

import { KEYCODES } from '~/lib/constants';
import { randomString } from '~/lib/utils/string';

import styles from './Autocomplete.styles';
import { generateIDs, getItemDOMId } from './Autocomplete.utils';
import AutocompleteActions from './AutocompleteActions';
import { AutocompleteResult } from './AutocompleteResultItem';
import AutocompleteResultItemDefault from './AutocompleteResultItemDefault';

const CONSTANTS = {
  DEFAULT_SELECTED_INDEX: -1,
  DEFAULT_VALUE: '',
  MINIMUM_CHARACTER_BEFORE_ERROR: 3,
};

export interface ResultItemProps {
  index: number;
  inputValue: string;
  listboxItemID: string;
  onItemSelected: (index: number, shouldFocusInput?: boolean) => void;
  result: AutocompleteResult;
  selectedIndex: number;
}

interface Props {
  children?: ReactChild;
  errorLabel: string | JSX.Element;
  inputMaxLength?: number;
  inputValidationRegEx?: RegExp;
  inputValue?: string;
  label: string;
  onChange: (value: string) => void;
  onInputResultMatch?: (inputMatchesResult: boolean) => void;
  onValueSelectionSuccess: (value: AutocompleteResult) => void;
  resultItemComponent?: (resultItemProps: ResultItemProps) => JSX.Element;
  results: AutocompleteResult[];
}

// Autocomplete combobox with listbox popup
// Based on:
// Approach: https://www.w3.org/TR/wai-aria-practices/#combobox
// Example: https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html (List Autocomplete with Automatic Selection)
function Autocomplete({
  children,
  errorLabel,
  inputMaxLength,
  inputValidationRegEx,
  inputValue = CONSTANTS.DEFAULT_VALUE,
  label,
  onChange,
  onValueSelectionSuccess,
  onInputResultMatch,
  resultItemComponent: ResultItemComponent = AutocompleteResultItemDefault,
  results,
}: Props) {
  const [ids, setIds] = useState({
    invalidID: '',
    labelID: '',
    listboxID: '',
    listboxItemID: '',
  });
  const [shouldShowListbox, setShouldShowListbox] = useState(false);
  const [value, setValue] = useState(inputValue);
  const [activedescendant, setActivedescendant] = useState(
    CONSTANTS.DEFAULT_VALUE,
  );
  const [selectedIndex, setSelectedIndex] = useState(
    CONSTANTS.DEFAULT_SELECTED_INDEX,
  );

  const textInput = useRef<HTMLInputElement>(null);

  const isInputEmpty = value.length < 1;
  const hasResults = results.length > 0;
  const validResults = results.find((result) => result.main.includes(value));
  const isInvalidInput =
    !validResults && value.length > CONSTANTS.MINIMUM_CHARACTER_BEFORE_ERROR;
  const inputMatchesResult =
    !!validResults && validResults.main === value && !isInvalidInput;

  const focusOnInput = () => {
    if (textInput.current) {
      textInput.current.focus();
    }
  };

  useEffect(() => {
    setIds(generateIDs(randomString(10)));
  }, []);

  useEffect(() => {
    if (onInputResultMatch) {
      onInputResultMatch(inputMatchesResult);
    }
  }, [inputMatchesResult, onInputResultMatch]);

  useEffect(() => {
    setShouldShowListbox(!isInvalidInput && hasResults && !isInputEmpty);
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
    let targetValue = e.currentTarget.value;

    if (inputValidationRegEx) {
      targetValue = targetValue.replace(inputValidationRegEx, '');
    }

    onChange(targetValue);
    setValue(targetValue);
  };

  useEffect(() => {
    if (inputValue) {
      onChange(inputValue);
      setValue(inputValue);
      focusOnInput();
    }
  }, [inputValue, onChange]);

  const selectIndex = (index: number) => {
    if (selectedIndex !== CONSTANTS.DEFAULT_SELECTED_INDEX) {
      setActivedescendant(getItemDOMId(ids.listboxItemID, results[index].main));
      setSelectedIndex(index);
    }
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
        e.preventDefault();
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
    setValue(results[index].main);
    setActivedescendant(CONSTANTS.DEFAULT_VALUE);

    setShouldShowListbox(false);

    if (shouldFocusInput) {
      focusOnInput();
    }

    onValueSelectionSuccess(results[index]);
  };

  return (
    <>
      <div css={styles.inputContainer}>
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
              maxLength={inputMaxLength}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              ref={textInput}
              type="text"
              value={value}
            />
          </div>
        </div>

        <AutocompleteActions value={value} onClick={cancelSelection} />
      </div>
      <ul
        aria-labelledby={ids.labelID}
        css={styles.listbox}
        id={ids.listboxID}
        role={shouldShowListbox ? 'listbox' : ''}
      >
        {shouldShowListbox &&
          results.map((result, index) => (
            <ResultItemComponent
              index={index}
              inputValue={value}
              key={index}
              listboxItemID={ids.listboxItemID}
              onItemSelected={onItemSelected}
              result={result}
              selectedIndex={selectedIndex}
            />
          ))}

        {isInvalidInput && (
          <li css={styles.errorMessage} id={ids.invalidID}>
            {errorLabel}
          </li>
        )}
      </ul>
      {!shouldShowListbox && !isInvalidInput && children}
    </>
  );
}

export default Autocomplete;
