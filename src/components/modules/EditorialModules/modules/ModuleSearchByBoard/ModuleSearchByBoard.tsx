import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleSearchByBoard } from '~/data/models/SiteModules';

function ModuleSearchByBoard({ ...props }: SiteModuleSearchByBoard) {
  return (
    <div data-component="module-searchbyboard">
      <Grid css={styles.spacingTopS60XL80}>
        <GridItem fullbleed>
          <SearchByBoard {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleSearchByBoard;
