import articleFeatured from './ArticleFeatured/ArticleFeatured.mock';
import ArticleListWithFeatured from './ArticleListWithFeatured';
import articles from './ArticleListWithFeatured.mock';

export default {
  component: ArticleListWithFeatured,
  title: 'Global/Article List With Featured',
};

export function TypicalArticleListWithFeatured() {
  return (
    <ArticleListWithFeatured articleFeatured={articleFeatured} {...articles} />
  );
}
