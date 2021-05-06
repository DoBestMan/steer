import ButtonGrid from '~/components/global/ButtonGrid/ButtonGrid';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleButtonGrid } from '~/data/models/SiteModules';

function ModuleButtonGrid(props: SiteModuleButtonGrid) {
  return (
    <div data-component="module-button-grid">
      {props.headerText && (
        <Grid>
          <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
            <Markdown isEditorial>{props.headerText}</Markdown>
          </GridItem>
        </Grid>
      )}
      <div css={styles.spacingTopS20XL40}>
        <ButtonGrid {...props} />
      </div>
    </div>
  );
}

export default ModuleButtonGrid;
