import { ReactNode } from 'react';

import { randomString } from '~/lib/utils/string';

import styles from './RadioSelector.styles';

interface Props {
  activeValue?: string;
  checked?: boolean;
  children?: ReactNode;
  isDisabled?: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  outerContent?: ReactNode;
  value: string;
}

function RadioSelector({
  activeValue,
  children,
  isDisabled,
  label,
  name,
  onChange,
  outerContent,
  value,
  ...rest
}: Props) {
  const isActive = activeValue === value;
  const id = `${randomString(10)}-radio-selector`;

  function handleChange() {
    onChange(value);
  }

  return (
    <div
      css={[styles.container, isActive && styles.containerChecked]}
      {...rest}
    >
      <input
        aria-checked={isActive}
        aria-label={label}
        checked={isActive}
        css={styles.input}
        disabled={isDisabled}
        id={id}
        name={name}
        onChange={handleChange}
        role="radio"
        type="radio"
        value={value}
      />

      <label
        css={[
          styles.label,
          isActive && styles.labelChecked,
          outerContent && styles.labelWithOuterContent,
        ]}
        htmlFor={id}
      >
        <div css={[styles.header, isActive && styles.headerChecked]}>
          {label}
          <span
            aria-hidden
            css={[styles.indicator, isActive && styles.indicatorChecked]}
          />
        </div>
        <div>{children}</div>
      </label>

      {outerContent && <div css={styles.outerContent}>{outerContent}</div>}
    </div>
  );
}

export default RadioSelector;
