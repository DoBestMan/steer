import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleImage } from '~/data/models/SiteModules';

function ModuleImage(props: SiteModuleImage) {
  return props.isColumn ? (
    <div data-component="module-image">
      <Image {...props} widths={[400, 800, 1200, 1600]} />
    </div>
  ) : (
    <div data-component="module-image">
      <Grid css={styles.spacingTopS60XL80}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <Image {...props} widths={[400, 800, 1200, 1600]} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleImage;
