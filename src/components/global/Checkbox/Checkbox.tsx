import { ReactNode, useState } from 'react';

import Icon from '../Icon/Icon';
import { ICONS } from '../Icon/Icon.constants';
import styles from './Checkbox.styles';

interface Props {
  checked?: boolean;
  children?: ReactNode;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
}

export default function Checkbox({
  children,
  defaultChecked = false,
  onChange,
  ...rest
}: Props) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  function handleChange() {
    if (onChange) {
      onChange(!isChecked);
    }
    setIsChecked(!isChecked);
  }
  return (
    <label css={[styles.root, isChecked && styles.rootChecked]}>
      {children}
      <input
        aria-checked={isChecked}
        checked={isChecked}
        css={styles.input}
        onChange={handleChange}
        role="checkbox"
        type="checkbox"
        defaultChecked={defaultChecked}
        {...rest}
      />
      <span css={styles.container}>
        <span
          aria-hidden
          css={[styles.indicator, isChecked && styles.indicatorChecked]}
        >
          <Icon name={ICONS.CHECKMARK} />
        </span>
      </span>
    </label>
  );
}
