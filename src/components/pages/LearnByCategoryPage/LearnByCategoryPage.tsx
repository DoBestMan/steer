import { useRouter } from 'next/router';

import Article from '~/components/global/ArticleListWithFeatured/Article/Article';
import ArticleFeatured from '~/components/global/ArticleListWithFeatured/ArticleFeatured/ArticleFeatured';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Meta from '~/components/global/Meta/Meta';
import Pagination from '~/components/global/Pagination/Pagination';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import ModuleBreadcrumbs from '~/components/modules/EditorialModules/modules/ModuleBreadcrumbs/ModuleBreadcrumbs';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteLearnByCategory } from '~/data/models/SiteLearnByCategory';
import { SiteLink } from '~/data/models/SiteLink';
import { createNewEvent } from '~/lib/helpers/browser';

import styles from './LearnByCategoryPage.styles';

interface Props {
  pageData: SiteLearnByCategory;
}

function LearnByCategoryPage({ pageData }: Props) {
  const router = useRouter();

  if (process.browser && window) {
    setTimeout(() => window.dispatchEvent(createNewEvent('resize')));
  }

  const breadcrumbs = pageData.breadcrumbs;
  const pagination = pageData.articlesPaginationMetaData.pagination;
  if (!pagination || !pagination.offset || !pagination.resultsPerPage) {
    return null;
  }

  const pageItems = Array(
    Math.ceil(pagination.total / (pagination.resultsPerPage || 2)),
  )
    .fill(0)
    .map((_, index) => ({
      link: {
        isExternal: false,
        href:
          `${breadcrumbs[2].link.href}` +
          (index === 0 ? '' : `?page=${index + 1}`),
      } as SiteLink,
    }));

  const initialPage =
    Math.floor(pagination.offset / pagination.resultsPerPage) + 1;

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: number,
  ) => {
    const { breadcrumbs } = pageData;
    event.preventDefault();
    const redirectUrl =
      `${breadcrumbs[2].link.href}` + (value === 1 ? '' : `?page=${value}`);
    router.push(redirectUrl);
  };

  return (
    <div css={[styles.root, navigationBreadcrumbPaddingTop]}>
      <Meta {...pageData.metadata.meta} />
      <div css={styles.breadcrumbs}>
        <ModuleBreadcrumbs breadcrumbs={pageData.breadcrumbs} />
      </div>
      <div css={styles.header}>
        <EditorialHeaders
          moduleData={pageData.header}
          moduleType={pageData.header.type}
        />
      </div>
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          {pageData.topArticles && (
            <div css={styles.topArticles}>
              {pageData.topArticles.map((articleFeatured) => (
                <div css={styles.articleWrapper} key={articleFeatured.title}>
                  <ArticleFeatured {...articleFeatured} />
                </div>
              ))}
            </div>
          )}
          <div css={styles.articles}>
            {pageData.articles.map((article) => (
              <Article {...article} key={article.title} />
            ))}
          </div>
        </GridItem>
      </Grid>
      <div css={styles.pagination}>
        <Pagination
          onPageChange={handlePageChange}
          pageItems={pageItems}
          initialPage={initialPage}
        />
      </div>
    </div>
  );
}

export default LearnByCategoryPage;
