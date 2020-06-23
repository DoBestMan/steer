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
  required?: boolean;
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
  required,
  value,
  ...rest
}: Props) {
  const { hasError, errorMessage } = error;

  const [inputId, setInputId] = useState(id);
  const [isFocused, setIsFocused] = useState(false);

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
  }

  function handleOnChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value } = event.target;
    onChange(value);
  }

  const InputEl = isTextArea ? 'textarea' : 'input';

  return (
    <span
      css={[
        styles.container,
        isFocused && focusStyles.container,
        disabled && styles.disabled,
        isTextArea && textAreaStyles.container,
        hasError && !disabled && errorStyles.container,
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
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        required={required}
        {...rest}
      />
      {hasError && errorMessage && (
        <span role="alert" css={errorStyles.errorMessage}>
          {errorMessage}
        </span>
      )}
    </span>
  );
}

export default Input;
