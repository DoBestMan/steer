import Loading from '~/components/global/Loading/Loading';
import { THEME } from '~/lib/constants';

import { styles } from './LoadingPage.styles';

interface Props {
  theme?: THEME.LIGHT | THEME.DARK;
}

export default function LoadingPage({ theme = THEME.LIGHT }: Props) {
  return (
    <div css={[styles.root, styles[theme]]}>
      <Loading theme={theme} />
    </div>
  );
}
