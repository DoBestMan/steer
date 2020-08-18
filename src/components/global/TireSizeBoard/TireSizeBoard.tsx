import React from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import styles from '~/components/global/TireSizeBoard/TireSizeBoard.styles';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

export interface TireSizeBoardProps {
  onTireSizeCTAClick: () => void;
  onVehicleInfoCTAClick: () => void;
  tireSizeBoardTitle: string;
}
interface CTA {
  label: string;
  type: 'vehicleInfo' | 'tireSize';
}

const CTAList: Array<CTA> = [
  {
    label: ui('tireSizeBoard.vehicleInfo'),
    type: 'vehicleInfo',
  },
  {
    label: ui('tireSizeBoard.tireSize'),
    type: 'tireSize',
  },
];

function TireSizeBoard({
  tireSizeBoardTitle,
  onVehicleInfoCTAClick,
  onTireSizeCTAClick,
}: TireSizeBoardProps) {
  const mapOnClickHandler: { [name: string]: () => void } = {
    vehicleInfo: onVehicleInfoCTAClick,
    tireSize: onTireSizeCTAClick,
  };
  return (
    <div>
      <div css={styles.tireSizeBoardContainer}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <Markdown css={styles.tireSizeBoardTitle} isEditorial>
              {tireSizeBoardTitle}
            </Markdown>
            <div css={styles.tireSizeBoardButtonsContainer}>
              {CTAList.map((button) => {
                const onClickHandler = mapOnClickHandler[button.type] || null;

                return (
                  <Button
                    css={styles.tireSizeBoardButton}
                    theme={THEME.ORANGE}
                    onClick={onClickHandler}
                    key={button.label}
                  >
                    {button.label}
                  </Button>
                );
              })}
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export default TireSizeBoard;
