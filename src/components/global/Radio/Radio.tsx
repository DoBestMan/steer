import { InputHTMLAttributes } from 'react';

import styles from './Radio.styles';

interface Props  // use custom on change
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  activeValue?: string;
  isDisabled?: boolean;
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export default function Radio({
  activeValue,
  isDisabled,
  onChange,
  value,
  ...rest
}: Props) {
  function handleChange() {
    onChange(value);
  }
  const isActive = activeValue === value;
  return (
    <>
      <input
        aria-checked={isActive}
        aria-disabled={isDisabled}
        css={styles.input}
        disabled={isDisabled}
        onClick={handleChange}
        role="radio"
        type="radio"
        value={value}
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
