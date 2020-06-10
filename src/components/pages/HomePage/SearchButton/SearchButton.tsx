import { CSSObject } from '@emotion/core';
import { MouseEventHandler } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import SearchLabel from '~/components/modules/Search/SearchLabel/SearchLabel';
import { typography } from '~/styles/typography.styles';

import styles from './SearchButton.styles';

interface Props {
  onClick: MouseEventHandler;
}

function SearchButton({ onClick }: Props) {
  return (
    <div css={styles.buttonContainer}>
      <button
        onClick={onClick}
        css={[typography.primaryHeadline, styles.button]}
      >
        <Grid>
          <GridItem
            gridColumnS="5/6"
            gridColumnM="7/8"
            gridColumnL="2/3"
            css={styles.iconColumn}
          >
            <Icon name={ICONS.MAIN_SEARCH} css={styles.icon} />
          </GridItem>

          <GridItem
            as="span"
            css={styles.label}
            gridColumnS="2/5"
            gridColumnM="2/7"
            gridColumnL="3/14"
            gridColumnXL="3/14"
          >
            <SearchLabel
              customContainerStyles={styles.searchLabel as CSSObject}
            />
          </GridItem>
        </Grid>
      </button>
    </div>
  );
}

export default SearchButton;
