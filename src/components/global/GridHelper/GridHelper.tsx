import { useEffect, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useSearch } from '~/hooks/useSearch';
import { NB_COLUMNS } from '~/lib/constants';

import styles from './GridHelper.styles';

interface Props {
  show?: boolean;
}

function GridHelper(props: Props) {
  const { show } = props;

  const [hasMounted, setHasMounted] = useState(false);
  const search = useSearch();
  const { bk } = useBreakpoints();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if ((!search.grid && !show) || !hasMounted) {
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
