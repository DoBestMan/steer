import { ChangeEvent, useEffect, useState } from 'react';

import { randomString } from '~/lib/utils/string';

import styles, {
  errorStyles,
  focusStyles,
  textAreaStyles,
} from './Input.styles';

interface Props {
  contextualLabel?: string;
  disabled?: boolean;
  error?: { errorMessage?: string; hasError: boolean };
  hasError?: boolean;
  id?: string;
  isTextArea?: boolean;
  label: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  required?: boolean;
  type?: string;
  validationFn?: (value: string) => void;
  value?: string;
}

function Input({
  contextualLabel,
  disabled,
  error = { hasError: false },
  id,
  isTextArea,
  label,
  onChange,
  onKeyDown,
  required,
  type,
  validationFn,
  value,
  ...rest
}: Props) {
  const { hasError, errorMessage } = error;

  const [inputId, setInputId] = useState(id);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!id) {
      setInputId(`${randomString(10)}-input`);
    }
  }, [id]);

  function handleOnFocus() {
    setIsFocused(true);
  }

  function handleOnBlur() {
    setIsFocused(false);

    if (value) {
      setIsTouched(true);

      if (validationFn) {
        validationFn(value);
      }
    } else {
      setIsTouched(false);
    }
  }

  function handleOnChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value } = event.target;
    onChange(value);

    if (validationFn && isTouched && value.length > 0) {
      validationFn(value);
    }
  }

  const InputEl = isTextArea ? 'textarea' : 'input';

  // We should only show the validation error when the input has been touched
  const showErrorState = hasError && isTouched;

  return (
    <span
      css={[
        styles.container,
        isFocused && focusStyles.container,
        disabled && styles.disabled,
        isTextArea && textAreaStyles.container,
        showErrorState && !disabled && errorStyles.container,
      ]}
    >
      <label
        htmlFor={inputId}
        css={[
          styles.label,
          isTextArea && textAreaStyles.label,
          (isFocused || !!value) && focusStyles.label,
        ]}
      >
        {label}
      </label>
      <InputEl
        aria-required={required}
        disabled={disabled}
        css={[
          styles.input,
          isTextArea && textAreaStyles.input,
          isFocused && focusStyles.input,
        ]}
        id={inputId}
        placeholder={contextualLabel}
        value={value}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onKeyDown={onKeyDown}
        required={required}
        type={type}
        {...rest}
      />
      {showErrorState && errorMessage && (
        <span role="alert" css={errorStyles.errorMessage}>
          {errorMessage}
        </span>
      )}
    </span>
  );
}

export default Input;
