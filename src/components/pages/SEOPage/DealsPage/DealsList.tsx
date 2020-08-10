import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import PromotionCard, {
  PromotionCardProps,
} from '~/components/global/PromotionCard/PromotionCard';
import Separator from '~/components/global/Separator/Separator';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { openReferAFriendModal } from '~/lib/helpers/refer-a-friend';

import styles from './DealsPage.styles';

export interface Props {
  items: Array<PromotionCardProps>;
  title: string;
}

export function DealsList({ title, items }: Props) {
  const gridColumnData = [
    {
      gridColumn: '2/6',
      gridColumnM: '2/5',
      gridColumnL: '2/8',
      gridColumnXL: '4/8',
    },
    {
      gridColumn: '2/6',
      gridColumnM: '5/8',
      gridColumnL: '8/14',
      gridColumnXL: '8/12',
    },
  ];

  let currentGridColumnPosition = 0;
  const { bk } = useBreakpoints();
  const nbItemsInARow = bk === BREAKPOINT_SIZES.S ? 1 : 2;
  const { setRouteQueryParamOptions } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
  function handlePromotionClick(params: Record<string, string>) {
    setRouteQueryParamOptions({
      routes: [
        ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
        ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
      ],
      params,
    });
    setIsSearchOpen(true);
  }
  return (
    <>
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          <div css={styles.dealsSepartor}>
            <Separator />
          </div>
          <div css={styles.dealsListHeading}>{title}</div>
        </GridItem>
      </Grid>
      <Grid>
        {items.map((dataItem, index) => {
          currentGridColumnPosition =
            currentGridColumnPosition <= nbItemsInARow - 1
              ? currentGridColumnPosition + 1
              : 1;
          return (
            <GridItem
              gridColumn={
                gridColumnData[currentGridColumnPosition - 1].gridColumn
              }
              gridColumnM={
                gridColumnData[currentGridColumnPosition - 1].gridColumnM
              }
              gridColumnL={
                gridColumnData[currentGridColumnPosition - 1].gridColumnL
              }
              gridColumnXL={
                gridColumnData[currentGridColumnPosition - 1].gridColumnXL
              }
              key={index}
            >
              {dataItem && (
                <div css={styles.promotionCardItem}>
                  <PromotionCard
                    {...dataItem}
                    handleReferAFriendClick={openReferAFriendModal}
                    handlePromotionClick={handlePromotionClick}
                  />
                </div>
              )}
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}
