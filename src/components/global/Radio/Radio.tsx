import { ReactNode } from 'react';

import styles from './Radio.styles';

interface Props {
  activeValue?: string;
  children?: ReactNode;
  isDisabled?: boolean;
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export default function Radio({
  children,
  isDisabled,
  onChange,
  value,
  activeValue,
  ...rest
}: Props) {
  const isActive = activeValue === value;
  function handleChange() {
    onChange(value);
  }
  return (
    <label css={[styles.root, isActive && styles.rootActive]} {...rest}>
      {children}
      <input
        aria-checked={isActive}
        aria-disabled={isDisabled}
        aria-label={value}
        css={styles.input}
        disabled={isDisabled}
        name={name}
        onClick={handleChange}
        role="radio"
        type="radio"
        value={value}
      />
      <span
        aria-hidden
        css={[styles.indicator, isActive && styles.indicatorActive]}
      >
        {isActive && <span css={styles.innerRadio} />}
      </span>
    </label>
  );
}
