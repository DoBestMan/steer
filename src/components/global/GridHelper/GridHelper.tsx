import styles from './GridHelper.styles';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useSearch } from '~/hooks/useSearch';

import { NB_COLUMNS } from '~/lib/constants';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

interface Props {
  show?: boolean;
}

function GridHelper(props: Props) {
  const { show } = props;
  const search = useSearch();
  const bk = useBreakpoints();

  if (!search.grid && !show) {
    return null;
  }

  const nbColumns = NB_COLUMNS[bk];
  const aMaxCol = [...Array(nbColumns)];

  return (
    <div css={styles.container}>
      <Grid css={styles.grid}>
        {aMaxCol.map((_value, i) => {
          const gridColumn = `${i + 2}/${i + 3}`;
          return (
            <GridItem
              css={styles.item}
              key={`grid_${i}`}
              gridColumn={gridColumn}
            />
          );
        })}
      </Grid>
    </div>
  );
}

export default GridHelper;
