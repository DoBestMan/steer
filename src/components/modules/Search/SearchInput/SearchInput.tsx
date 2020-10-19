import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { SearchInputEnum } from '../Search.types';
import styles from './SearchInput.styles';

interface AutocompleteInputProps {
  activeInputType: SearchInputEnum;
  clearInputComponent?: string | JSX.Element;
  isDisabled?: boolean;
  label?: ReactNode;
  onBackButtonClick: () => void;
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
      isDisabled,
      label,
      onChange,
      onClearInputClick,
      onFocus,
      onKeyDown,
      onBackButtonClick,
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

    const handleBack = () => {
      onBackButtonClick();
    };

    return (
      <div css={[styles.inputContainer, !isActive && styles.inactive]}>
        {searchStateLabel && (
          <div css={[styles.labelWrapper]}>
            <Link
              as="button"
              onClick={handleBack}
              icon={ICONS.ARROW_LEFT}
              css={styles.backButton}
            />
            <div
              css={[styles.inputText, styles.searchState]}
              data-testid="search-state"
            >
              {searchStateLabel}
            </div>
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
            data-testid="search-input"
            aria-labelledby={labelID}
            css={[styles.input, styles.inputText]}
            disabled={isDisabled}
            onChange={onChange}
            onFocus={handleFocus(type)}
            onKeyDown={onKeyDown}
            ref={ref}
            type="text"
            value={value}
          />
        </div>

        {clearInputComponent && (
          <button onClick={onClearInputClick} css={styles.clearButton}>
            {ui('search.clear')}
          </button>
        )}
      </div>
    );
  },
);

export default SearchInput;
