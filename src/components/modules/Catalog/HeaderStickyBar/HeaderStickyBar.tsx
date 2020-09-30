import { useTheme } from 'emotion-theming';
import { ReactNode } from 'react';

import styles from './HeaderStickyBar.styles';

interface Props {
  children: ReactNode;
}

export default function HeaderStickyBar({ children }: Props) {
  const { header } = useTheme();

  return <div css={[styles.root, header.background]}>{children}</div>;
}
