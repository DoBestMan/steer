import { typography } from '~/styles/typography.styles';

import { styles } from './Sticker.styles';

interface Props {
  label: string;
}

function Sticker(props: Props) {
  const { label } = props;

  return <span css={[typography.tertiaryHeadline, styles.root]}>{label}</span>;
}

export default Sticker;
