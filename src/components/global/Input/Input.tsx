import {
  ChangeEvent,
  forwardRef,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';

import { randomString } from '~/lib/utils/string';

import styles, {
  errorStyles,
  focusStyles,
  textAreaStyles,
} from './Input.styles';

type RefType =
  | ((instance: HTMLInputElement | HTMLTextAreaElement | null) => void)
  | MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>
  | null;

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

function Input(props: Props, ref: RefType) {
  const {
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
  } = props;
  const { hasError, errorMessage } = error;

  const [inputId, setInputId] = useState(id);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!id) {
      setInputId(`${randomString(10)}-input`);
    }
  }, [id]);

  useEffect(() => {
    // Reset isTouched if there's no value.
    if (!value) {
      setIsTouched(false);
    }
  }, [value]);

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

  const commonProps = {
    'aria-required': required,
    disabled,
    id: inputId,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onFocus: handleOnFocus,
    onKeyDown,
    placeholder: contextualLabel,
    required,
    value,
  };

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
      {isTextArea ? (
        <textarea
          css={[
            styles.input,
            isTextArea && textAreaStyles.input,
            isFocused && focusStyles.input,
          ]}
          ref={ref as MutableRefObject<HTMLTextAreaElement>}
          {...commonProps}
          {...rest}
        />
      ) : (
        <input
          css={[styles.input, isFocused && focusStyles.input]}
          ref={ref as MutableRefObject<HTMLInputElement>}
          type={type}
          {...commonProps}
          {...rest}
        />
      )}
      {showErrorState && errorMessage && (
        <span role="alert" css={errorStyles.errorMessage}>
          {errorMessage}
        </span>
      )}
    </span>
  );
}

export default forwardRef(Input);
