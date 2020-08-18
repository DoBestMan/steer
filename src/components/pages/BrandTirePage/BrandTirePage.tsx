import { useRouter } from 'next/router';
import { Fragment } from 'react';

import Accordion from '~/components/global/Accordion/Accordion';
import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderWithLogo from '~/components/global/HeaderWithLogo/HeaderWithLogo';
import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Meta from '~/components/global/Meta/Meta';
import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import PromotionCard from '~/components/global/PromotionCard/PromotionCard';
import { containerSpacing } from '~/components/modules/EditorialModules/EditorialModules.styles';
import ModuleMarkdown from '~/components/modules/EditorialModules/modules/ModuleMarkdown/ModuleMarkdown';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';
import { ROUTE_MAP, ROUTES, THEME } from '~/lib/constants';
import { openReferAFriendModal } from '~/lib/helpers/refer-a-friend';
import { capitalize } from '~/lib/utils/string';

import { styles } from './BrandTirePage.styles';
import { convertGroupsToAccordionItems } from './mappers/accordionItems';
import { mapPageRouteToBreadcrumbs } from './mappers/breadcrumbs';

export interface BrandTirePageProps extends SiteBrandDetails {
  brandName: string | string[];
}

function BrandTirePage({
  brandName,
  curatedProducts,
  deals,
  header,
  linkList,
  promoImage,
  reviewsLink,
}: BrandTirePageProps) {
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const { setRouteQueryParamOptions } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
  function handlePromotionClick(params: Record<string, string>) {
    setRouteQueryParamOptions({
      routes: [ROUTE_MAP[ROUTES.BRAND_DETAIL]],
      params,
    });
    setIsSearchOpen(true);
  }

  return (
    <div css={[navigationBreadcrumbPaddingTop]}>
      <Grid>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <Meta title={capitalize(`${brandName}`)} />
          <Breadcrumbs
            navigationItems={mapPageRouteToBreadcrumbs(
              asPath,
              pathname,
              query,
              brandName,
            )}
          />
        </GridItem>
      </Grid>
      <div css={containerSpacing.spacingTopS60XL80}>
        <Grid>
          <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
            {header && (
              <HeaderWithLogo {...header} imageLabel={`${brandName}`} />
            )}
            <div css={styles.reviewLinkContainer}>
              {reviewsLink?.link?.href && (
                <Link
                  css={styles.spacingTop20}
                  href={reviewsLink.link.href}
                  theme={THEME.LIGHT}
                >
                  {reviewsLink.label}
                </Link>
              )}
            </div>
          </GridItem>
        </Grid>
      </div>
      {promoImage && (
        <div css={containerSpacing.spacingTopS40XL60}>
          <div css={styles.imageSectionSmall}>
            <Image {...promoImage} widths={[320, 768]} />
          </div>
          <div css={styles.imageSectionLarge}>
            <Grid css={containerSpacing.spacingTopS40XL60}>
              <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
                <Image {...promoImage} widths={[320, 768, 900, 1200]} />
              </GridItem>
            </Grid>
          </div>
        </div>
      )}
      {curatedProducts && (
        <div css={styles.spacingTop20}>
          <Grid>
            <GridItem gridColumnL={'2/14'} gridColumnXL={'4/14'}>
              {curatedProducts.map((product, id) => (
                <div key={`${product.id}_${id}`}>
                  <ProductGroupList {...product} />
                </div>
              ))}
            </GridItem>
          </Grid>
        </div>
      )}
      {deals && (
        <>
          <ModuleMarkdown
            body={'<h2>Promotions</h2>'}
            type={'SiteModuleMarkdown'}
          />
          <Grid css={styles.spacingTop20}>
            <GridItem gridColumnL="2/14" gridColumnXL="4/12">
              <div css={styles.promotionSection}>
                {deals.map((deal, id) => (
                  <Fragment key={`${deal.title}_${id}`}>
                    {deal.items.map((item) => (
                      <Fragment key={`${item.title}_${id}`}>
                        <PromotionCard
                          handlePromotionClick={handlePromotionClick}
                          handleReferAFriendClick={openReferAFriendModal}
                          {...item}
                        />
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </div>
            </GridItem>
          </Grid>
        </>
      )}
      <div css={styles.linkSection}>
        {linkList &&
          linkList.map((link, id) => (
            <Fragment key={`${link.title}_${id}`}>
              {link?.title && (
                <ModuleMarkdown
                  body={`<h2>${link.title}</h2>`}
                  type={'SiteModuleMarkdown'}
                />
              )}
              <Grid>
                <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
                  {link.groups && (
                    <Accordion
                      id={`${link.title}_${id}`}
                      items={convertGroupsToAccordionItems(link.groups)}
                      theme={THEME.LIGHT}
                    />
                  )}
                </GridItem>
              </Grid>
            </Fragment>
          ))}
      </div>
    </div>
  );
}

export default BrandTirePage;
