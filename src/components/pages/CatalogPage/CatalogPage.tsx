import HeaderContainer from '~/components/modules/Catalog/Header.container';

import CatalogLoading from './CatalogLoading/CatalogLoading';
import styles from './CatalogPage.styles';

function CatalogPage() {
  return (
    <div css={styles.root}>
      <CatalogLoading isSearching />
      <HeaderContainer />
    </div>
  );
}

export default CatalogPage;
