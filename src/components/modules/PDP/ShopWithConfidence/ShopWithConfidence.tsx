import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/Markdown';
import { ui } from '~/lib/utils/ui-dictionary';

import { statsMock } from './ShopWithConfidence.mock';
import styles from './ShopWithConfidence.styles';

function ShopWithConfidence() {
  return (
    <Grid>
      <GridItem gridColumnL="3/end" css={styles.heading}>
        <h2 css={styles.title}>
          {ui('pdp.shopWithConfidence.title')}

          <Icon name={ICONS.CHECKMARK} css={styles.checkmark} />
        </h2>
      </GridItem>

      <GridItem fullbleed css={styles.carouselContainer}>
        <Carousel>
          {statsMock.map((item) => (
            <div key={item.heading}>
              <span css={styles.statHeading}>{item.heading}</span>
              <span css={styles.statDetail}>
                <Markdown renderers={{ paragraph: 'span' }}>
                  {item.detail}
                </Markdown>
              </span>
            </div>
          ))}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default ShopWithConfidence;
