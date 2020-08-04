import articles from '../ArticleListWithFeatured.mock';
import ArticleList from './ArticleList';

export default {
  component: ArticleList,
  title: 'Global/Article List With Featured/Article List',
};

export function TypicalArticleList() {
  return <ArticleList {...articles} />;
}
