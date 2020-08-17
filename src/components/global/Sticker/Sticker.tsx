import { CSSStylesProp } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { STICKER_SIZES, styles } from './Sticker.styles';

interface Props {
  customCss?: CSSStylesProp;
  customTypography?: CSSStylesProp;
  label: string;
  size?: STICKER_SIZES;
}

function Sticker(props: Props) {
  const {
    label,
    size = STICKER_SIZES.SMALL,
    customCss,
    customTypography,
  } = props;

  return (
    <span
      css={[
        customTypography ||
          (size === STICKER_SIZES.SMALL
            ? typography.secondarySubhead
            : typography.tertiaryHeadline),
        styles.root,
        size && styles[STICKER_SIZES[size]],
        customCss,
      ]}
    >
      {label}
    </span>
  );
}

export default Sticker;
