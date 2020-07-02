import { useRouter } from 'next/router';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteProduct } from '~/data/models/SiteProduct';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { keyToCamel } from '~/lib/utils/string';
import { typography } from '~/styles/typography.styles';

import styles from './ProductDetail.styles';

export interface ProductDetailData {
  serverData: SiteProduct;
}

function ProductDetailContainer({ serverData }: ProductDetailData) {
  const { query } = useRouter();
  const queryParams: Record<string, string> = {};

  Object.entries(query).map(([key, value]) => {
    if (typeof value === 'string') {
      queryParams[keyToCamel(key)] = value;
    }
  });

  const { data, error } = useApiDataWithDefault<SiteProduct>({
    defaultData: serverData,
    endpoint: '/product-details',
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (error) {
    console.error(error);
  }

  // TODO: This is just a dummy component to see data coming from the API
  const prettyData = JSON.stringify(data, undefined, 4);

  return (
    <div css={[styles.root, navigationPaddingTop]}>
      <Grid css={styles.height100}>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          css={styles.height100}
        >
          <div css={styles.page}>
            <h1 css={typography.jumboHeadline}>work-in-progress.</h1>
            <div css={styles.dataContainer}>
              <p>Data:</p>
              <textarea rows={20} css={styles.textArea} value={prettyData} />
            </div>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ProductDetailContainer;
