import { MouseEventHandler } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './SearchButton.styles';

interface Props {
  onClick: MouseEventHandler;
}

function SearchButton({ onClick }: Props) {
  return (
    <div css={styles.container}>
      <button
        onClick={onClick}
        css={[typography.primaryHeadline, styles.button]}
      >
        {ui('common.header.searchShortLabel')}
        <Icon name={ICONS.MAIN_SEARCH} css={styles.icon} />
      </button>
      <Grid>
        <GridItem css={styles.bottomBorder} />
      </Grid>
    </div>
  );
}

export default SearchButton;
