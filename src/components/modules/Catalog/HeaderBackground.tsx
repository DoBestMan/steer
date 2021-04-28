import { useTheme } from '@emotion/react';

import styles from './Header.styles';

export default function HeaderBackground() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { header }: any = useTheme();
  return <div css={[styles.headerContainer, header.background]}></div>;
}
