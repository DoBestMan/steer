import FeaturedInfoModule, {
  FeaturedInfoModuleProps,
} from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import styles from '~/components/global/GraphicGrid/GraphicGrid.styles';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';

interface GraphicGrid {
  graphicGridItems: Array<FeaturedInfoModuleProps>;
}

function GraphicGrid({ graphicGridItems }: GraphicGrid) {
  const { greaterThan, lessThan } = useBreakpoints();

  const getGridColumnByIndex = (idx: number, gridItems: number) => {
    let gridStartForS = 1;
    let gridStartForM = 1;
    let gridStartForL = 1;
    let gridEndForS = 5;
    let gridEndForM = 3;
    let gridEndForL = 4;
    if (gridItems === 2) {
      gridStartForS = 1;
      gridStartForM = 1;
      gridStartForL = 2;
      gridEndForS = 3;
      gridEndForM = 4;
      gridEndForL = 7;
      for (let i = 0; i < idx; i++) {
        gridStartForS += 2;
        gridStartForM += 3;
        gridStartForL += 5;
        gridEndForS += 2;
        gridEndForM += 3;
        gridEndForL += 5;
      }
    } else {
      for (let i = 0; i < idx; i++) {
        gridStartForS += 4;
        gridStartForM += 2;
        gridStartForL += 3;
        gridEndForS += 4;
        gridEndForM += 2;
        gridEndForL += 3;
      }
    }

    return {
      gridColumnS: `${gridStartForS.toString()}/${gridEndForS.toString()}`,
      gridColumnM: `${gridStartForM.toString()}/${gridEndForM.toString()}`,
      gridColumnL: `${gridStartForL.toString()}/${gridEndForL.toString()}`,
    };
  };
  if (graphicGridItems.length === 4 && lessThan.L) {
    return renderGridForSmallScreens(
      graphicGridItems.slice(0, 2),
      graphicGridItems.slice(2),
    );
  }
  function renderGridForSmallScreens(
    upperGridItems: Array<FeaturedInfoModuleProps>,
    lowerGridItems: Array<FeaturedInfoModuleProps>,
  ) {
    return (
      <Grid css={[styles.container, styles.alignedGridModule]}>
        <GridItem
          css={[styles.innerGrid]}
          gridColumnS="2/6"
          gridColumnM="2/8"
          gridColumnL="2/14"
          isGrid
        >
          {upperGridItems.map((grid, idx) => (
            <GridItem
              css={
                greaterThan.S
                  ? [styles.featuredInfoModule, styles.firstItemBorder]
                  : styles.featuredInfoModule
              }
              gridColumnS={
                getGridColumnByIndex(idx, upperGridItems.length).gridColumnS
              }
              gridColumnM={
                getGridColumnByIndex(idx, upperGridItems.length).gridColumnM
              }
              gridColumnL={
                getGridColumnByIndex(idx, upperGridItems.length).gridColumnL
              }
              key={idx}
            >
              <FeaturedInfoModule
                {...grid}
                customTitleStyles={styles.featuredInfoTitle}
              />
            </GridItem>
          ))}
        </GridItem>
        <GridItem
          css={styles.innerGrid}
          gridColumnS="2/6"
          gridColumnM="2/8"
          gridColumnL="2/14"
          isGrid
        >
          {lowerGridItems.map((grid, idx) => (
            <GridItem
              css={
                greaterThan.S
                  ? [styles.featuredInfoModule, styles.firstItemBorder]
                  : styles.featuredInfoModule
              }
              gridColumnS={
                getGridColumnByIndex(idx, lowerGridItems.length).gridColumnS
              }
              gridColumnM={
                getGridColumnByIndex(idx, lowerGridItems.length).gridColumnM
              }
              gridColumnL={
                getGridColumnByIndex(idx, lowerGridItems.length).gridColumnL
              }
              key={idx}
            >
              <FeaturedInfoModule
                {...grid}
                customTitleStyles={styles.featuredInfoTitle}
              />
            </GridItem>
          ))}
        </GridItem>
      </Grid>
    );
  }
  return (
    <Grid
      css={[
        styles.container,
        graphicGridItems.length === 2 && styles.alignedGridModule,
      ]}
    >
      <GridItem
        css={styles.innerGrid}
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="2/14"
        isGrid
      >
        {graphicGridItems.map((grid, idx) => (
          <GridItem
            css={
              graphicGridItems.length === 2 && greaterThan.S
                ? [styles.featuredInfoModule, styles.firstItemBorder]
                : styles.featuredInfoModule
            }
            gridColumnS={
              getGridColumnByIndex(idx, graphicGridItems.length).gridColumnS
            }
            gridColumnM={
              getGridColumnByIndex(idx, graphicGridItems.length).gridColumnM
            }
            gridColumnL={
              getGridColumnByIndex(idx, graphicGridItems.length).gridColumnL
            }
            key={idx}
          >
            <FeaturedInfoModule
              {...grid}
              customTitleStyles={styles.featuredInfoTitle}
              isTwoColumnItems={graphicGridItems.length === 2}
            />
          </GridItem>
        ))}
      </GridItem>
    </Grid>
  );
}

export default GraphicGrid;
