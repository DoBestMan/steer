import React, { InputHTMLAttributes } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import styles from './Checkbox.styles';

interface Props  // use custom on change
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  isDisabled?: boolean;
  onChange?: (value?: boolean) => void;
}

export default function Checkbox({
  checked,
  isDisabled = false,
  onChange,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    onChange && onChange(value);
  };

  return (
    <>
      <input
        aria-checked={checked}
        aria-disabled={isDisabled}
        css={[styles.input, isDisabled && styles.disabled]}
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        onChange={handleChange}
        {...rest}
      />
      <span
        css={[
          styles.container,
          checked && styles.containerChecked,
          isDisabled && styles.disabledIndicator,
        ]}
      >
        <span
          aria-hidden
          css={[styles.indicator, checked && styles.indicatorChecked]}
        >
          <Icon name={ICONS.CHECKMARK} />
        </span>
      </span>
    </>
  );
}
