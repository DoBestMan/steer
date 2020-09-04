import { createRef, RefObject, useCallback, useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import useClickOutside from '~/hooks/useClickOutside';
import useMobileOrTablet from '~/hooks/useMobileOrTablet';
import { KEYCODES } from '~/lib/constants';
import { randomString } from '~/lib/utils/string';

import Option from './Option';
import styles, { errorStyles, focusStyles } from './Select.styles';
import SelectForMobile from './SelectForMobile';

export interface SelectOption {
  text: string;
  value: string;
}

export interface Props {
  disabled?: boolean;
  error?: { errorMessage?: string; hasError: boolean };
  hasError?: boolean;
  id?: string;
  label: string;
  list: Array<SelectOption>;
  onChange: (value: string | null) => void;
  placeholder: string;
  required?: boolean;
  validationFn?: (value: string) => void;
  value?: string;
}

function Select(props: Props) {
  const {
    disabled,
    error = { hasError: false },
    id,
    list,
    onChange,
    placeholder,
    required,
    validationFn,
    value,
    label,
    ...rest
  } = props;
  const { hasError, errorMessage } = error;
  const defaultOption: SelectOption = {
    value: '',
    text: placeholder,
  };

  const isMobileOrTablet = useMobileOrTablet();
  const [focusedOption, setFocusedOption] = useState<SelectOption | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  );
  const [isActive, setActive] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [baseId, setBaseId] = useState(id);
  const [focusedOptionIndex, setFocusedIndex] = useState<number>(-2);
  const [selectedOptionIndex, setSelectedIndex] = useState<number>(-2);
  const [isOpen, setOpen] = useState(false);
  const [optionsRefs, setOptionsRefs] = useState<RefObject<HTMLLIElement>[]>(
    [],
  );

  useEffect(() => {
    if (!id) {
      setBaseId(`${randomString(10)}-select`);
    }
  }, [id]);

  useEffect(() => {
    if (!value) {
      setIsTouched(false);
    }
  }, [value]);

  useEffect(() => {
    if (!list.length) {
      return;
    }

    setOptionsRefs(Array.from(Array(list.length)).map(() => createRef()));
  }, [list]);

  const getSelectedOptionIndex = useCallback(
    (option) => {
      if (!option) {
        setSelectedIndex(-1);
        return;
      }
      const selectedIndex = list.findIndex(
        (item) => item.value === option.value,
      );
      setSelectedIndex(selectedIndex);
    },
    [list],
  );

  const toggle = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleOnKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isActive) {
        return;
      }
      if (isActive && event.keyCode === KEYCODES.SPACE) {
        event.preventDefault();
        if (focusedOption) {
          setSelectedOption(focusedOption);
        } else {
          setSelectedOption(defaultOption);
        }
        toggle();
      }
      if (isOpen && event.keyCode === KEYCODES.ENTER) {
        event.preventDefault();
        if (focusedOption) {
          setSelectedOption(focusedOption);
        } else {
          setSelectedOption(defaultOption);
        }
        toggle();
      }
      if (
        event.keyCode === KEYCODES.ARROW_DOWN &&
        focusedOptionIndex < list.length - 1
      ) {
        setFocusedIndex((old) => old + 1);
      }
      if (event.keyCode === KEYCODES.ARROW_UP && focusedOptionIndex > -1) {
        setFocusedIndex((old) => old - 1);
      }
    },
    [
      toggle,
      isOpen,
      isActive,
      focusedOptionIndex,
      list,
      focusedOption,
      defaultOption,
    ],
  );

  useEffect(() => {
    getSelectedOptionIndex(selectedOption);
  }, [selectedOption, getSelectedOptionIndex]);

  useEffect(() => {
    if (!list.length || focusedOptionIndex < -1) {
      return;
    }
    setFocusedOption(list[focusedOptionIndex]);
  }, [focusedOptionIndex, list]);

  const handleOnFocus = () => {
    setActive(true);
  };

  const handleOnBlur = () => {
    setActive(false);
  };

  const handleOnOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    onChange(option.value);

    if (validationFn && isTouched && option.value.length > 0) {
      validationFn(option.value);
    }
    setOpen(false);
  };

  const handleClickOutside = () => {
    setActive(false);
    setOpen(false);
    if (value) {
      setIsTouched(true);
      if (validationFn) {
        validationFn(value);
      }
    } else {
      setIsTouched(false);
    }
  };

  const ref = useClickOutside(handleClickOutside);

  const showErrorState = hasError && isTouched;

  if (isMobileOrTablet) {
    return (
      <SelectForMobile
        id={baseId}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        label={label}
        list={list}
        value={value}
        required={required}
        {...rest}
      />
    );
  }

  return (
    <span
      aria-haspopup="listbox"
      aria-labelledby={`${baseId}__label ${baseId}__input`}
      onFocus={!disabled ? handleOnFocus : undefined}
      onBlur={!disabled ? handleOnBlur : undefined}
      onKeyDown={!disabled ? handleOnKeyDown : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled ? 'true' : 'false'}
      css={styles.listbox}
      ref={ref}
    >
      <div
        css={[
          styles.header,
          disabled && styles.disabled,
          isActive && focusStyles.container,
          showErrorState && !disabled && errorStyles.container,
        ]}
      >
        <label
          htmlFor={`${baseId}__input`}
          css={[
            styles.label,
            (isActive || !!value) && !showErrorState && focusStyles.label,
          ]}
        >
          {label}
        </label>
        <button
          onClick={toggle}
          disabled={disabled}
          css={styles.button}
          tabIndex={-1}
        >
          <input
            readOnly
            value={selectedOption ? selectedOption.text : placeholder}
            id={`${baseId}__input`}
            tabIndex={-1}
            disabled={disabled}
            css={[
              styles.input,
              disabled && styles.disabled,
              (isActive || !!value) && !showErrorState && styles.inputActive,
            ]}
          />
          <span>
            {isOpen ? (
              <Icon name={ICONS.CHEVRON_UP} />
            ) : (
              <Icon name={ICONS.CHEVRON_DOWN} />
            )}
          </span>
        </button>
      </div>
      {!isOpen && showErrorState && errorMessage && (
        <span role="alert" css={errorStyles.errorMessage}>
          {errorMessage}
        </span>
      )}
      {isOpen && (
        <span css={styles.dropdown}>
          <ul
            role="listbox"
            aria-activedescendant={
              focusedOption ? focusedOption.value : undefined
            }
            tabIndex={-1}
            aria-hidden={isActive ? 'false' : 'true'}
            aria-labelledby={`${baseId}__label`}
          >
            <Option
              baseId={baseId}
              option={defaultOption}
              index={-1}
              focusedOptionIndex={focusedOptionIndex}
              selectedOptionIndex={selectedOptionIndex}
              optionClick={handleOnOptionClick}
              customCss={styles.visuallyHidden}
            />
            {list.map((option, index) => {
              return (
                <Option
                  key={index}
                  baseId={baseId}
                  focusedOptionIndex={focusedOptionIndex}
                  selectedOptionIndex={selectedOptionIndex}
                  index={index}
                  option={option}
                  optionClick={handleOnOptionClick}
                  ref={optionsRefs[index]}
                />
              );
            })}
          </ul>
        </span>
      )}
    </span>
  );
}

export default Select;
