import React, { InputHTMLAttributes } from 'react';

import styles from './Radio.styles';

interface Props  // use custom on change
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  isActive?: boolean;
  isDisabled?: boolean;
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export default function Radio({
  isActive,
  isDisabled,
  onChange,
  value,
  name,
  ...rest
}: Props) {
  function handleChange() {
    onChange(value);
  }

  return (
    <>
      <input
        aria-checked={isActive}
        aria-disabled={isDisabled}
        css={styles.input}
        disabled={isDisabled}
        onClick={handleChange}
        type="radio"
        value={value}
        className={name ? name : ''}
        name={name ? name : ''}
        {...rest}
      />
      <span
        aria-hidden
        css={[
          styles.indicator,
          isActive && styles.indicatorActive,
          isDisabled && styles.disabledIndicator,
        ]}
      >
        {isActive && <span css={styles.innerRadio} />}
      </span>
    </>
  );
}
