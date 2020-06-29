import Checkbox from './Checkbox';
import { useCheckboxManager } from './Checkbox.hooks';
import styles from './Checkbox.styles';

interface Props {
  checked?: boolean;
  count?: number | null;
  defaultChecked?: boolean;
  description?: string | null;
  flair?: string | null;
  handleChange?: (value: boolean) => void;
  isDisabled?: boolean;
  label: string;
}

export default function CopyCheckbox({
  defaultChecked,
  handleChange,
  isDisabled = false,
  label,
  ...rest
}: Props) {
  const { onChange, checked } = useCheckboxManager({
    handleChange,
    defaultChecked,
  });
  return (
    <label css={[styles.copyRoot, !checked && styles.rootHover]}>
      <Checkbox
        onChange={onChange}
        checked={checked}
        isDisabled={isDisabled}
        {...rest}
      />
      <span css={[styles.copyLabel, isDisabled && styles.disabledLabel]}>
        {label}
      </span>
    </label>
  );
}
