import { useTheme } from 'emotion-theming';

import Loading from '~/components/global/Loading/Loading';

import styles from './CatalogLoading.styles';

function CatalogLoading() {
  const { message } = useTheme();
  return (
    <div css={styles.container}>
      <Loading theme={message.loadingTheme} />
    </div>
  );
}

export default CatalogLoading;
