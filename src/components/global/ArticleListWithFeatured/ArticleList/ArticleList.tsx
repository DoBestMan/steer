import Link from '~/components/global/Link/Link';
import { SiteLink } from '~/data/models/SiteLink';
import { THEME } from '~/lib/constants';

import Article, { ArticleProps } from '../Article/Article';
import styles from './ArticleList.styles';

export interface Props {
  articleList?: Array<ArticleProps>;
  moreLink?: {
    label: string;
    link: SiteLink;
  };
}

export default function ArticleList({ articleList, moreLink }: Props) {
  if (!articleList) {
    return null;
  }

  return (
    <div css={styles.list}>
      {articleList.map((article, index) => (
        <Article {...article} key={`article_list_${index}`} />
      ))}
      {moreLink && (
        <Link theme={THEME.LIGHT} href={moreLink.link.href} css={styles.link}>
          {moreLink.label}
        </Link>
      )}
    </div>
  );
}
