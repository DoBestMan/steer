import { typography } from '~/styles/typography.styles';

import { styles } from './Sticker.styles';

interface Props {
  isLarge?: boolean;
  label: string;
}

function Sticker(props: Props) {
  const { label, isLarge } = props;

  return (
    <span
      css={[
        isLarge ? typography.tertiaryHeadline : typography.smallCopyTight,
        styles.root,
        isLarge && styles.large,
      ]}
    >
      {label}
    </span>
  );
}

export default Sticker;
