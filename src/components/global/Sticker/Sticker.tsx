import { typography } from '~/styles/typography.styles';

import { styles } from './Sticker.styles';

interface Props {
  isSmall?: boolean;
  label: string;
}

function Sticker(props: Props) {
  const { label, isSmall } = props;

  return (
    <span
      css={[
        isSmall ? typography.smallCopyTight : typography.tertiaryHeadline,
        styles.root,
        isSmall && styles.small,
      ]}
    >
      {label}
    </span>
  );
}

export default Sticker;
