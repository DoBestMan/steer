import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteCatalogSummaryRecirculation } from '~/data/models/SiteCatalogSummaryRecirculation';

import styles from './Recirculation.styles';
import RecirculationItem from './RecirculationItem';

interface Props {
  handleUpdateResults: (filters: Record<string, string>) => void;
}

function Recirculation({
  items,
  title,
  more,
  handleUpdateResults,
}: Props & SiteCatalogSummaryRecirculation) {
  return (
    <Grid>
      <GridItem gridColumnS="2/5" gridColumnM="2/5" gridColumnL="2/6">
        <h2 css={styles.title}>{title}</h2>
      </GridItem>
      <GridItem gridColumnM="5/8" gridColumnL="7/14">
        <ul>
          {items.map((item) => (
            <RecirculationItem
              handleUpdateResults={handleUpdateResults}
              key={item.label}
              {...item}
            />
          ))}
          <RecirculationItem
            handleUpdateResults={handleUpdateResults}
            {...more}
          />
        </ul>
      </GridItem>
    </Grid>
  );
}

export default Recirculation;
