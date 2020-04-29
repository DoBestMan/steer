import styles from './DriverInsights.styles';

import GridItem from '~/components/global/Grid/GridItem';

import { typography } from '~/styles/typography.styles';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';
import { colors } from '~/styles/colors.styles';
import { SiteInsights } from '~/data/models/SiteInsights';
import { INSIGHT_TYPE } from '~/lib/backend/insights.types';
import ListCard from '~/components/global/Card/ListCard';
import Card from '~/components/global/Card/Card';
import { SiteInsightItemDefault } from '~/data/models/SiteInsightItemDefault';
import { SiteInsightItemList } from '~/data/models/SiteInsightItemList';

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
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        <h2 css={[colors.GLOBAL.WHITE, styles.title]}>{title}</h2>

        {!isMobile && (
          <p
            css={[typography.bodyCopy, colors.DARK.GRAY_40, styles.description]}
          >
            {body}
          </p>
        )}
      </GridItem>
      <GridItem gridColumnM="5/8" gridColumnL="8/13" css={styles.cards}>
        {siteInsightList.map((props) =>
          mapInsightTypeToCard[props.type](props),
        )}
      </GridItem>
    </>
  );
}

export default DriverInsights;
