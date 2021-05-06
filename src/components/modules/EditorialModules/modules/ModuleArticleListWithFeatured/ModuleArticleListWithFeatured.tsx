import ArticleListWithFeatured from '~/components/global/ArticleListWithFeatured/ArticleListWithFeatured';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleArticleListWithFeatured } from '~/data/models/SiteModules';

function ModuleArticleListWithFeatured(
  props: SiteModuleArticleListWithFeatured,
) {
  return props.isColumn ? (
    <div data-component="module-article-list-with-featured">
      <ArticleListWithFeatured {...props} />
    </div>
  ) : (
    <div data-component="module-article-list-with-featured">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <ArticleListWithFeatured {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleArticleListWithFeatured;
