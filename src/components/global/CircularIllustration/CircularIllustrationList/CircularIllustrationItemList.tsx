import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, CSSStyles } from '~/lib/constants';

import CircularIllustrationItem, {
  TitlePlacement,
} from '../CircularIllustrationItem/CircularIllustrationItem';
import { styles } from '../CircularIllustrationItem/CircularIllustrationItem.styles';

export interface Props {
  dataItems: Array<SiteGraphicTile>;
  itemCustomStyle?: CSSStyles;
  titlePlacement?: TitlePlacement;
}

export function CircularIllustrationList({
  dataItems,
  titlePlacement = TitlePlacement.top,
  itemCustomStyle,
}: Props) {
  const gridColumnData = [
    {
      gridColumn: '2/4',
      gridColumnM: '2/4',
      gridColumnL: '2/5',
      gridColumnXL: '4/6',
    },
    {
      gridColumn: '4/6',
      gridColumnM: '4/6',
      gridColumnL: '5/8',
      gridColumnXL: '6/8',
    },
    {
      gridColumn: '2/4',
      gridColumnM: '6/8',
      gridColumnL: '8/11',
      gridColumnXL: '8/10',
    },
    {
      gridColumn: '4/6',
      gridColumnM: '2/4',
      gridColumnL: '11/14',
      gridColumnXL: '10/12',
    },
  ];

  let currentGridColumnPosition = 0;
  const { bk } = useBreakpoints();
  const nbItemsInARow =
    bk === BREAKPOINT_SIZES.S ? 2 : bk === BREAKPOINT_SIZES.M ? 3 : 4;
  return (
    <Grid>
      {dataItems.map((dataItem: SiteGraphicTile, index) => {
        currentGridColumnPosition =
          currentGridColumnPosition <= nbItemsInARow - 1
            ? currentGridColumnPosition + 1
            : 1;
        return (
          <GridItem
            css={[styles.titlePositionTop, itemCustomStyle]}
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
            {dataItem.link && dataItem.link.href && (
              <BaseLink href={dataItem.link.href}>
                <CircularIllustrationItem
                  {...dataItem}
                  titlePlacement={titlePlacement}
                />
              </BaseLink>
            )}
            {dataItem && !dataItem.link && (
              <CircularIllustrationItem
                {...dataItem}
                titlePlacement={titlePlacement}
              />
            )}
          </GridItem>
        );
      })}
    </Grid>
  );
}
