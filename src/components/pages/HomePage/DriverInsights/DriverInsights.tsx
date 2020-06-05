import Card from '~/components/global/Card/Card';
import ListCard from '~/components/global/Card/ListCard';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteInsightItemDefault } from '~/data/models/SiteInsightItemDefault';
import { SiteInsightItemList } from '~/data/models/SiteInsightItemList';
import { SiteInsights } from '~/data/models/SiteInsights';
import { INSIGHT_TYPE } from '~/lib/backend/insights.types';
import { typography } from '~/styles/typography.styles';

import styles from './DriverInsights.styles';

const mapInsightTypeToCard = {
  [INSIGHT_TYPE.DEFAULT]: function Default(
    card: SiteInsightItemDefault | SiteInsightItemList,
  ) {
    return <Card key={card.id} {...(card as SiteInsightItemDefault)} />;
  },
  [INSIGHT_TYPE.LIST]: function List(
    card: SiteInsightItemDefault | SiteInsightItemList,
  ) {
    return <ListCard key={card.id} {...(card as SiteInsightItemList)} />;
  },
};

function DriverInsights({ body, siteInsightList, title }: SiteInsights) {
  return (
    <>
      <GridItem gridColumnM="2/5" gridColumnL="2/6" gridColumnXL="3/7">
        <h2 css={styles.title}>{title}</h2>
        <p css={[typography.bodyCopy, styles.description]}>{body}</p>
      </GridItem>
      <GridItem
        gridColumnM="5/8"
        gridColumnL="7/14"
        gridColumnXL="8/13"
        css={styles.cards}
      >
        {siteInsightList.map((props) =>
          mapInsightTypeToCard[props.type](props),
        )}
      </GridItem>
    </>
  );
}

export default DriverInsights;
