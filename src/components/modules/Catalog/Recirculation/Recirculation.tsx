import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteLink } from '~/data/models/SiteLink';

import styles from './Recirculation.styles';
import RecirculationItem, { ItemProps } from './RecirculationItem';

interface Props {
  items: ItemProps[];
  more: {
    description: string;
    label: string;
    link: SiteLink;
  };
  title: string;
}

function Recirculation({ items, title, more }: Props) {
  return (
    <Grid>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
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
