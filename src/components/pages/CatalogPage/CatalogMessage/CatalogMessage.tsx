import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';

import { Brands } from '../CatalogPage.constants';
import styles from './CatalogMessage.styles';

interface Props {
  brands: Brands;
}

function CatalogMessage({ brands }: Props) {
  return (
    <Grid css={styles.container}>
      <GridItem>
        {/* TODO: check heading hierarchy */}
        <h2 css={styles.heading}>3 tires fit your Civic</h2>
        <ul css={styles.list}>
          {brands.map((brand) => {
            const imageStyles = styles[`logo_${brand.id}`];
            return (
              <li key={brand.altText}>
                <Image
                  altText={brand.altText}
                  css={imageStyles}
                  srcSet={brand.src}
                />
              </li>
            );
          })}
        </ul>
      </GridItem>
    </Grid>
  );
}

export default CatalogMessage;
