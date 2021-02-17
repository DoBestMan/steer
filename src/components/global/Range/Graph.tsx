import { COLORS } from '~/lib/constants';

import { barHeights } from './Graph.constants';
import { styles } from './Graph.styles';

export interface GraphProps {
  maxPercentage: number;
  minPercentage: number;
}

function Graph({ maxPercentage, minPercentage }: GraphProps) {
  const getBarBackgroundColor = (index: number) => {
    if (barHeights.length < 2) {
      return COLORS.GLOBAL.ORANGE;
    }
    const indexPercentage = (100 * index) / (barHeights.length - 1);
    const step = 25 / barHeights.length;
    return indexPercentage <= maxPercentage + step &&
      indexPercentage >= minPercentage - step
      ? COLORS.GLOBAL.ORANGE
      : COLORS.LIGHT.GRAY_70;
  };

  return (
    <div aria-hidden="true" css={styles.container}>
      {barHeights.map((heightSize, index) => (
        <div
          css={[
            styles.bar,
            {
              height: heightSize,
              backgroundColor: getBarBackgroundColor(index),
            },
          ]}
          key={`${heightSize}_${index}`}
        />
      ))}
    </div>
  );
}

export default Graph;
