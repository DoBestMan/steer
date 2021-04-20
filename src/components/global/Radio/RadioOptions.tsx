import { CSSStylesProp } from '~/lib/constants';

import Radio from './Radio';
import styles from './Radio.styles';

interface Props {
  active?: boolean;
  activeValue?: string;
  customRootStyles?: CSSStylesProp;
  isDisabled?: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export default function RadioOptions({
  active,
  activeValue,
  customRootStyles,
  isDisabled = false,
  label,
  name,
  ...rest
}: Props) {
  const isActive = active ? active : activeValue === rest.value;

  return (
    <label
      css={[
        styles.optionsRoot,
        isActive ? styles.rootActive : styles.rootHover,
        customRootStyles,
      ]}
    >
      <Radio
        name={name}
        isDisabled={isDisabled}
        isActive={isActive}
        {...rest}
      />
      <span css={styles.optionsTextWrapper}>
        <p css={styles.optionsText}>{label}</p>
      </span>
    </label>
  );
}
