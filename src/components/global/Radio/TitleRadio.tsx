import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';

import Radio from './Radio';
import styles from './Radio.styles';

interface Props {
  activeValue?: string;
  count?: number | null;
  description?: string | null;
  flair?: string | null;
  isDisabled?: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export default function TitleRadio({
  count = null,
  description,
  flair,
  isDisabled = false,
  label,
  name,
  ...rest
}: Props) {
  const isActive = rest.activeValue === rest.value;
  return (
    <label
      css={[styles.titleRoot, isActive ? styles.rootActive : styles.rootHover]}
    >
      <TitleSelectorLabel
        count={count}
        description={description}
        flair={flair}
        label={label}
        isDisabled={isDisabled}
        css={styles.label}
      />
      <Radio name={name} isDisabled={isDisabled} {...rest} />
    </label>
  );
}
