import React from 'react';

import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import CircularIllustrationCarousel from '~/components/global/CircularIllustration/CircularIllustrationCarousel/CircularIllustrationCarousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage, {
  HeaderLandingPageProps,
} from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Link from '~/components/global/Link/Link';
import LinkList, { LinkListProps } from '~/components/global/LinkList/LinkList';
import Markdown from '~/components/global/Markdown/Markdown';
import Meta from '~/components/global/Meta/Meta';
import ProductGroupList, {
  ProductGroupListProps,
} from '~/components/global/ProductGroupList/ProductGroupList';
import TireSizeBoardContainer from '~/components/global/TireSizeBoard/TireSizeBoard.container';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { ROUTES, THEME } from '~/lib/constants';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TypePage.styles';

interface TypePageData {
  typeData: TypePageProps;
}
export interface TypePageProps {
  curatedProducts: Array<ProductGroupListProps>;
  header: HeaderLandingPageProps;
  links?: LinkListProps | null;
  name: string;
  popularBrands: Array<SiteGraphicTile>;
  reviewsLink: SiteLinkWithLabel | null;
}

function TypePage({ typeData }: TypePageData) {
  const typeName = typeData.name.replace('-', ' ');
  const typeBreadCrumData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.TYPE_LANDING,
    },
    {
      label: capitalize(typeName) + ' tires',
      url: `/types/${typeData.name}-tires`,
    },
  ]);

  const meta = {
    title: ui('meta.typePages.title', {
      type: capitalize(typeName),
    }),
    description: ui('meta.typePages.description', {
      type: capitalize(typeName),
    }),
  };
  const tireSizeBoardTitle = ui('typePage.tireSizeBoardTitle', {
    type: typeName,
  });

  return (
    <div css={[styles.root]}>
      <div css={styles.pageHeader}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <Meta {...meta} />
            <div css={styles.breadCrumbs}>
              <BreadcrumbsComponent navigationItems={typeBreadCrumData} />
            </div>
            <div>
              <HeaderLandingPage
                {...typeData.header}
                title={capitalize(typeName) + ' tires'}
              />
            </div>

            {typeData.reviewsLink && (
              <Link
                css={styles.reviewText}
                href={
                  typeData.reviewsLink.link && typeData.reviewsLink.link.href
                }
                theme={THEME.LIGHT}
              >
                {typeData.reviewsLink.label}
              </Link>
            )}
          </GridItem>
        </Grid>
      </div>
      <div css={styles.mostPopularBrandsContainer}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <Markdown isEditorial>
              {ui('typePage.mostPopularBrandsHeadlineCopy')}
            </Markdown>
            <Markdown isEditorial>
              {ui('typePage.mostPopularTextCopy', {
                type: typeName,
              })}
            </Markdown>
          </GridItem>
        </Grid>
      </div>
      <CircularIllustrationCarousel
        dataItems={typeData.popularBrands}
        imageMaxWidthCustomStyles={styles.logosBrandsMaxWidth}
      />
      {typeData.curatedProducts.map((obj: ProductGroupListProps) => {
        return (
          <div key={obj.id} css={styles.curatedProductsContainer}>
            <ProductGroupList {...obj} />
          </div>
        );
      })}
      <TireSizeBoardContainer title={tireSizeBoardTitle} />
      {typeData.links ? (
        <Grid css={styles.alsoInterestedContainer}>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <LinkList {...typeData.links} />
          </GridItem>
        </Grid>
      ) : null}
    </div>
  );
}

export default TypePage;
