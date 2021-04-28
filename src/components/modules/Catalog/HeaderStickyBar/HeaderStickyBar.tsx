import { useTheme } from '@emotion/react';
import { ReactNode } from 'react';

import styles from './HeaderStickyBar.styles';

interface Props {
  children: ReactNode;
}

export default function HeaderStickyBar({ children }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { header }: any = useTheme();

  return <div css={[styles.root, header.background]}>{children}</div>;
}
