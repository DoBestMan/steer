import Button, { ButtonProps } from '~/components/global/Button/Button';
import styles from '~/components/global/ButtonGrid/ButtonGrid.styles';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { LINK_TYPES } from '~/lib/constants';

export interface ButtonGridProps {
  buttonGridList: Array<ButtonProps>;
}

function ButtonGrid({ buttonGridList }: ButtonGridProps) {
  let gridStartForS = 2;
  let gridStartForM = 2;
  let gridStartForL = 2;
  let gridEndForS = 4;
  let gridEndForM = 4;
  let gridEndForL = 5;
  const setGridVal = (index: number) => {
    if (index !== 0) {
      gridStartForS = gridStartForS + 2;
      gridStartForM = gridStartForM + 2;
      gridStartForL = gridStartForL + 3;
      gridEndForS = gridEndForS + 2;
      gridEndForM = gridEndForM + 2;
      gridEndForL = gridEndForL + 3;
    }
    if (gridStartForS === 6) {
      gridStartForS = 2;
      gridEndForS = 4;
    }
    if (gridStartForM === 8) {
      gridStartForM = 2;
      gridEndForM = 4;
    }
    if (gridStartForL === 14) {
      gridStartForL = 2;
      gridEndForL = 5;
    }

    return {
      gridColumnS: `${gridStartForS.toString()}/${gridEndForS.toString()}`,
      gridColumnM: `${gridStartForM.toString()}/${gridEndForM.toString()}`,
      gridColumnL: `${gridStartForL.toString()}/${gridEndForL.toString()}`,
    };
  };
  return (
    <Grid>
      {buttonGridList.map((buttonData, index) => {
        const obj = setGridVal(index);
        return (
          <GridItem
            css={styles.titlePositionTop}
            gridColumnS={obj.gridColumnS}
            gridColumnM={obj.gridColumnM}
            gridColumnL={obj.gridColumnL}
            key={index}
          >
            <Button
              css={[
                styles.buttonLayoutStyle,
                buttonData.as === LINK_TYPES.A && styles.buttonTextStyle,
              ]}
              {...buttonData}
            >
              {buttonData.children}
            </Button>
          </GridItem>
        );
      })}
    </Grid>
  );
}
export default ButtonGrid;
