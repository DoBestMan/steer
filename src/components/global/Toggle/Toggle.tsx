import { InputHTMLAttributes, useState } from 'react';

import LiveRegion from '~/components/global/Accessibility/LiveRegion';

import styles from './Toggle.styles';

enum VALUES {
  OFF = 'off',
  ON = 'on',
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onToggle: (isChecked: boolean) => void;
  testId?: string;
}

export default function Toggle({
  defaultChecked,
  name,
  onToggle,
  testId,
}: Props) {
  const [isChecked, setChecked] = useState(defaultChecked);
  function toggleChecked() {
    setChecked(!isChecked);
    if (onToggle) {
      onToggle(!isChecked);
    }
  }

  return (
    <button
      css={styles.switch}
      onClick={toggleChecked}
      role="switch"
      aria-checked={isChecked}
      aria-label={name}
      data-testid={testId}
    >
      <LiveRegion text={isChecked ? VALUES.ON : VALUES.OFF} />
      <span css={[styles.slider, isChecked && styles.sliderActive]}>
        <span css={[styles.indicator, isChecked && styles.checked]} />
      </span>
    </button>
  );
}
