import Button, { ButtonProps } from '~/components/global/Button/Button';
import styles from '~/components/global/ButtonGrid/ButtonGrid.styles';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

export interface ButtonGridProps {
  buttonGridList: Array<ButtonProps>;
}

function ButtonGrid({ buttonGridList }: ButtonGridProps) {
  let gridStartForS = 2;
  let gridStartForM = 2;
  let gridStartForL = 3;
  let gridStartForXL = 5;
  let gridEndForS = 4;
  let gridEndForM = 4;
  let gridEndForL = 6;
  let gridEndForXL = 7;
  const setGridVal = (index: number) => {
    if (index !== 0) {
      gridStartForS = gridStartForS + 2;
      gridStartForM = gridStartForM + 2;
      gridStartForL = gridStartForL + 3;
      gridStartForXL = gridStartForXL + 2;
      gridEndForS = gridEndForS + 2;
      gridEndForM = gridEndForM + 2;
      gridEndForL = gridEndForL + 3;
      gridEndForXL = gridEndForXL + 2;
    }
    if (gridStartForS === 6) {
      gridStartForS = 2;
      gridEndForS = 4;
    }
    if (gridStartForM === 8) {
      gridStartForM = 2;
      gridEndForM = 4;
    }
    if (gridStartForL === 12) {
      gridStartForL = 3;
      gridEndForL = 6;
    }
    if (gridStartForXL === 11) {
      gridStartForXL = 5;
      gridEndForXL = 7;
    }

    return {
      gridColumnS: `${gridStartForS.toString()}/${gridEndForS.toString()}`,
      gridColumnM: `${gridStartForM.toString()}/${gridEndForM.toString()}`,
      gridColumnL: `${gridStartForL.toString()}/${gridEndForL.toString()}`,
      gridColumnXL: `${gridStartForXL.toString()}/${gridEndForXL.toString()}`,
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
            gridColumnXL={obj.gridColumnXL}
            key={index}
          >
            <Button
              css={[
                styles.buttonLayoutStyle,
                'href' in buttonData &&
                  buttonData.href &&
                  styles.buttonTextStyle,
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
