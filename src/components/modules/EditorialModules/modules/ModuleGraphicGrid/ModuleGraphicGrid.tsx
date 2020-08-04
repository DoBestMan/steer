import GraphicGrid from '~/components/global/GraphicGrid/GraphicGrid';
import { transformGraphicGridData } from '~/components/global/GraphicGrid/mappers/graphicGridItem';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleGraphicGrid } from '~/data/models/SiteModules';

function ModuleGraphicGrid({ items }: SiteModuleGraphicGrid) {
  return (
    <div data-component="module-graphic-grid">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <GraphicGrid graphicGridItems={transformGraphicGridData(items)} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleGraphicGrid;
