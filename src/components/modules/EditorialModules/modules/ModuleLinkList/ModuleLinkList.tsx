import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import LinkList from '~/components/global/LinkList/LinkList';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleLinkList } from '~/data/models/SiteModules';

function ModuleLinkList(props: SiteModuleLinkList) {
  return props.isColumn ? (
    <div data-component="module-link-list">
      <LinkList {...props} />
    </div>
  ) : (
    <div data-component="module-link-list">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <LinkList {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleLinkList;
