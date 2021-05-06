import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderArticlePage from '~/components/global/HeaderArticlePage/HeaderArticlePage';
import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';

function ModuleHeaderArticle(data: SiteHeaderModule) {
  return (
    <Grid>
      <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
        <HeaderArticlePage {...data} />
      </GridItem>
    </Grid>
  );
}

export default ModuleHeaderArticle;
