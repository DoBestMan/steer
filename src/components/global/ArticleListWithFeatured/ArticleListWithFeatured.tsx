import { SiteLink } from '~/data/models/SiteLink';

import { ArticleProps } from './Article/Article';
import ArticleFeatured from './ArticleFeatured/ArticleFeatured';
import ArticleList from './ArticleList/ArticleList';

export interface ArticleListWithFeaturedProps {
  articleFeatured?: ArticleProps;
  articleList?: Array<ArticleProps>;
  moreLink?: {
    label: string;
    link: SiteLink;
  };
}

export default function ArticleListWithFeatured({
  articleFeatured,
  articleList,
  moreLink,
}: ArticleListWithFeaturedProps) {
  if (!articleFeatured && !articleList) {
    return null;
  }

  const hasBorder = articleList && articleList?.length > 0;

  return (
    <div>
      {articleFeatured && (
        <ArticleFeatured {...articleFeatured} hasBorder={hasBorder} />
      )}
      {articleList && articleList.length && (
        <ArticleList articleList={articleList} moreLink={moreLink} />
      )}
    </div>
  );
}
