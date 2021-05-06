import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import { SiteModuleMarkdown } from '~/data/models/SiteModules';

function ModuleMarkdown({ body, isColumn }: SiteModuleMarkdown) {
  return isColumn ? (
    <div data-component="module-markdown">
      <Markdown isEditorial>{body}</Markdown>
    </div>
  ) : (
    <div data-component="module-markdown">
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'3/13'}
          gridColumnXL={'5/11'}
        >
          <Markdown isEditorial>{body}</Markdown>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleMarkdown;
