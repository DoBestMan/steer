import { typography } from '~/styles/typography.styles';

import { STICKER_SIZES, styles } from './Sticker.styles';

interface Props {
  label: string;
  size?: STICKER_SIZES;
}

function Sticker(props: Props) {
  const { label, size = STICKER_SIZES.SMALL } = props;

  return (
    <span
      css={[
        size === STICKER_SIZES.SMALL
          ? typography.secondarySubhead
          : typography.tertiaryHeadline,
        styles.root,
        size && styles[STICKER_SIZES[size]],
      ]}
    >
      {label}
    </span>
  );
}

export default Sticker;
