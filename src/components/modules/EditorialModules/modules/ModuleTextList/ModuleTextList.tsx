import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import TextBasedList from '~/components/global/TextBasedList/TextBasedList';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleTextList } from '~/data/models/SiteModules';

function ModuleTextList(props: SiteModuleTextList) {
  return props.isColumn ? (
    <div data-component="module-text-list">
      <TextBasedList {...props} />
    </div>
  ) : (
    <div data-component="module-text-list">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <TextBasedList {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleTextList;
