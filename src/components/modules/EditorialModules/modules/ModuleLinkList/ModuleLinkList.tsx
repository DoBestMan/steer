import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import LinkList from '~/components/global/LinkList/LinkList';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleLinkList } from '~/data/models/SiteModules';

function ModuleLinkList(props: SiteModuleLinkList) {
  return (
    <div data-component="module-link-list">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <LinkList {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleLinkList;
