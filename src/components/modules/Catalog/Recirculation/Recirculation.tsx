import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteCatalogSummaryRecirculation } from '~/data/models/SiteCatalogSummaryRecirculation';

import styles from './Recirculation.styles';
import RecirculationItem from './RecirculationItem';

function Recirculation({
  items,
  title,
  more,
}: SiteCatalogSummaryRecirculation) {
  return (
    <Grid>
      <GridItem gridColumnS="2/5" gridColumnM="2/5" gridColumnL="2/6">
        <h2 css={styles.title}>{title}</h2>
      </GridItem>
      <GridItem gridColumnM="5/8" gridColumnL="7/14">
        <ul>
          {items.map((item) => (
            <RecirculationItem key={item.label} {...item} />
          ))}
          <RecirculationItem {...more} />
        </ul>
      </GridItem>
    </Grid>
  );
}

export default Recirculation;
