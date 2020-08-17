import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { THEME } from '~/lib/constants';
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

        <Link
          css={styles.learnMoreButton}
          as="button"
          // TODO update link url when available
          href="/#"
          theme={THEME.LIGHT}
        >
          {ui('pdp.shopWithConfidence.linkLabel')}
        </Link>
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
