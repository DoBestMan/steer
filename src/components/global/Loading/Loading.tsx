import { SerializedStyles } from '@emotion/core';

import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles from './Loading.styles';

interface Props {
  customStyles?: SerializedStyles;
  label?: string;
  theme?: THEME.LIGHT | THEME.DARK;
}

function Loading({
  customStyles,
  label = ui('common.loading.label'),
  theme = THEME.LIGHT,
}: Props) {
  return (
    <div css={[styles.container, customStyles]}>
      <span css={screenReaderText}>{label}</span>
      <span css={[styles.container, styles.circle, styles[theme]]}></span>
    </div>
  );
}

export default Loading;
