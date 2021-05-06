import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import { transformBreadcrumbsItem } from '~/components/global/Breadcrumbs/mappers/breadcrumbsItem';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleBreadcrumbs } from '~/data/models/SiteModules';

function ModuleBreadcrumbs({ breadcrumbs }: SiteModuleBreadcrumbs) {
  return (
    <div data-component="module-breadcrumbs">
      <Grid css={[styles.spacingBottomS50XL60]}>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <Breadcrumbs
            navigationItems={transformBreadcrumbsItem(breadcrumbs)}
          />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleBreadcrumbs;
