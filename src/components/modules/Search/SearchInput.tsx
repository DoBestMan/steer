import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { randomString } from '~/lib/utils/string';

import { SearchInputEnum } from './Search.types';
import styles from './SearchInput.styles';

interface AutocompleteInputProps {
  activeInputType: SearchInputEnum;
  clearInputComponent?: string | JSX.Element;
  label?: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearInputClick?: () => void;
  onFocus: (inputType: SearchInputEnum) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  searchStateLabel?: string;
  type: SearchInputEnum;
  value: string;
}

const SearchInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  (
    {
      activeInputType,
      clearInputComponent,
      label,
      onChange,
      onClearInputClick,
      onFocus,
      onKeyDown,
      searchStateLabel,
      type,
      value,
    },
    ref,
  ) => {
    const [labelID, setLabelID] = useState('');

    const isActive = activeInputType === type;
    const isLabelHidden = !!value || !!searchStateLabel;

    useEffect(() => {
      setLabelID(`${randomString(10)}-search`);
    }, []);

    const handleFocus = (inputType: SearchInputEnum) => () => {
      onFocus(inputType);
    };

    return (
      <div css={[styles.inputContainer, !isActive && styles.inactive]}>
        {searchStateLabel && (
          <div css={[styles.inputText, styles.searchState]}>
            {searchStateLabel}
          </div>
        )}
        {label && (
          <label
            css={[styles.label, isLabelHidden && styles.labelHidden]}
            id={labelID}
          >
            {label}
          </label>
        )}
        <div css={styles.comboboxWrapper}>
          <input
            aria-labelledby={labelID}
            css={[styles.input, styles.inputText]}
            onChange={onChange}
            onFocus={handleFocus(type)}
            onKeyDown={onKeyDown}
            ref={ref}
            type="text"
            value={value}
          />
        </div>

        {clearInputComponent && (
          <button onClick={onClearInputClick}>{clearInputComponent}</button>
        )}
      </div>
    );
  },
);

export default SearchInput;
