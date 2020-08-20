import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';

import Checkbox from './Checkbox';
import styles from './Checkbox.styles';

interface Props {
  checked?: boolean;
  count?: number | null;
  defaultChecked?: boolean;
  description?: string | null;
  flair?: string | null;
  handleChange?: () => void;
  isDisabled?: boolean;
  label: string;
}

export default function TitleCheckbox({
  count = null,
  checked,
  description,
  flair,
  isDisabled = false,
  label,
  handleChange,
  ...rest
}: Props) {
  return (
    <label
      css={[styles.titleRoot, checked ? styles.rootActive : styles.rootHover]}
    >
      <TitleSelectorLabel
        count={count}
        description={description}
        flair={flair}
        label={label}
        isDisabled={isDisabled}
        css={styles.label}
      />
      <Checkbox
        onChange={handleChange}
        checked={checked}
        isDisabled={isDisabled}
        {...rest}
      />
    </label>
  );
}
