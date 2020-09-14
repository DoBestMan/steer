import { CSSStylesProp, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles from './Loading.styles';

interface Props {
  customContainerStyles?: CSSStylesProp;
  label?: string;
  theme?: THEME.LIGHT | THEME.DARK;
}

function Loading({
  customContainerStyles,
  label = ui('common.loading.label'),
  theme = THEME.LIGHT,
}: Props) {
  return (
    <div
      css={[styles.container, customContainerStyles]}
      data-testid="loading-indicator"
    >
      <span css={screenReaderText}>{label}</span>
      <span css={[styles.container, styles.circle, styles[theme]]}></span>
    </div>
  );
}

export default Loading;
