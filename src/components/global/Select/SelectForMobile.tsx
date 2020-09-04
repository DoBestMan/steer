import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import { Props } from './Select';
import { errorStyles, focusStyles } from './Select.styles';
import styles from './SelectForMobile.styles';

function SelectForMobile(props: Props) {
  const {
    id,
    placeholder,
    list,
    onChange,
    disabled,
    required,
    value,
    validationFn,
    label,
    error = { hasError: false },
    ...rest
  } = props;
  const { hasError, errorMessage } = error;

  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    onChange(value);

    if (validationFn && isTouched && value.length > 0) {
      validationFn(value);
    }
  };

  const showErrorState = hasError && isTouched;

  return (
    <div css={[styles.wrapper]}>
      <div
        css={[
          styles.header,
          disabled && styles.disabled,
          isFocused && focusStyles.container,
        ]}
      >
        <label
          htmlFor={`${id}__input`}
          css={[styles.label, (isFocused || !!value) && focusStyles.label]}
        >
          {label}
        </label>
        <select
          id={`${id}__input`}
          disabled={disabled}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleChange}
          aria-required={required}
          aria-label={`${id}__label`}
          css={[styles.select, (isFocused || !!value) && styles.activeSelect]}
          defaultValue={''}
          {...rest}
        >
          <option value="" hidden>
            {placeholder}
          </option>
          {list.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
        <span css={styles.icon}>
          <Icon name={ICONS.CHEVRON_DOWN} />
        </span>
      </div>
      {showErrorState && errorMessage && (
        <span role="alert" css={errorStyles.errorMessage}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default SelectForMobile;
