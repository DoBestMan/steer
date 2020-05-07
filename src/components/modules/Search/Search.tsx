import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { LINK_SIZE, LINK_THEME, LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Search.styles';

interface Props {
  onCloseSearchClick: () => void;
}

function Search({ onCloseSearchClick }: Props) {
  return (
    <Grid css={styles.container}>
      <GridItem
        gridColumnS="5/6"
        gridColumnM="7/8"
        gridColumnL="13/14"
        gridColumnXL="13/14"
      >
        <Link
          as={LINK_TYPES.BUTTON}
          css={styles.closeSearchButton}
          onClick={onCloseSearchClick}
          size={LINK_SIZE.SM}
          theme={LINK_THEME.LIGHT}
        >
          {ui('search.cancelButtonLabel')}
        </Link>
      </GridItem>
    </Grid>
  );
}

export default Search;
