import { useTheme } from 'emotion-theming';

import styles from './Header.styles';

export default function HeaderBackground() {
  const { header } = useTheme();
  return <div css={[styles.headerContainer, header.background]}></div>;
}
