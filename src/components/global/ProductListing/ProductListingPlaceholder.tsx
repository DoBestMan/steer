import placeholders from '~/styles/placeholders';

import styles from './ProductListing.styles';

function ProductListingPlaceholder() {
  return (
    <div css={styles.root}>
      <div css={[placeholders.image, { height: 185, width: 185 }]} />
      <div css={[placeholders.text, { height: 20, width: 145 }]} />
      <div css={[placeholders.text, { height: 20, width: 130 }]} />
      <div css={[placeholders.text, { height: 20, width: 75 }]} />
    </div>
  );
}

export default ProductListingPlaceholder;
