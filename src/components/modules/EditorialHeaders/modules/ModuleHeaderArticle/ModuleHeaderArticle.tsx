import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderArticlePage from '~/components/global/HeaderArticlePage/HeaderArticlePage';
import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';

function ModuleHeaderArticle(data: SiteHeaderModule) {
  return (
    <Grid>
      <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
        <HeaderArticlePage {...data} />
      </GridItem>
    </Grid>
  );
}

export default ModuleHeaderArticle;
