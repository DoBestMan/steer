import DataTableVertical from '~/components/global/DataTables/DataTableVertical';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleDataTableVertical } from '~/data/models/SiteModules';

function ModuleDataTableVertical(props: SiteModuleDataTableVertical) {
  return props.isColumn ? (
    <div data-component="module-data-table-vertical">
      <DataTableVertical {...props} />
    </div>
  ) : (
    <div data-component="module-data-table-vertical">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <DataTableVertical {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleDataTableVertical;
