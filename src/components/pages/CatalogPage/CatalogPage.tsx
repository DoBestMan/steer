import CatalogLoading from './CatalogLoading/CatalogLoading';
import styles from './CatalogPage.styles';

function CatalogPage() {
  return (
    <div css={styles.root}>
      <CatalogLoading isSearching />
    </div>
  );
}

export default CatalogPage;
