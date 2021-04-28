import { useRouter } from 'next/router';
import { Fragment } from 'react';

import Accordion from '~/components/global/Accordion/Accordion';
import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderWithLogo from '~/components/global/HeaderWithLogo/HeaderWithLogo';
import Image from '~/components/global/Image/Image';
import Meta from '~/components/global/Meta/Meta';
import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import PromotionCard from '~/components/global/PromotionCard/PromotionCard';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import { containerSpacing } from '~/components/modules/EditorialModules/EditorialModules.styles';
import ModuleMarkdown from '~/components/modules/EditorialModules/modules/ModuleMarkdown/ModuleMarkdown';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';
import { ROUTE_MAP, ROUTES, THEME } from '~/lib/constants';
import { openReferAFriendModal } from '~/lib/helpers/refer-a-friend';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

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
}: BrandTirePageProps) {
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const { setQueryParamLabel, setRouteQueryParamOptions } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const tirebrand = capitalize(`${brandName}`);
  const searchParams = {
    brand: tirebrand as string,
  };
  const meta = {
    description: ui('meta.brands.brand.index.description', {
      brand: tirebrand,
    }),
    shareImage: header.image,
    title: ui('meta.brands.brand.index.title', { brand: tirebrand }),
  };

  function handlePromotionClick(params: Record<string, string>, label: string) {
    setRouteQueryParamOptions({
      routes: [ROUTE_MAP[ROUTES.BRAND_DETAIL]],
      params,
    });
    setQueryParamLabel(label);
    setIsSearchOpen(true);
  }

  return (
    <div css={[navigationBreadcrumbPaddingTop, styles.spacingBottom60]}>
      <Grid>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <Meta {...meta} />
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
      <div css={containerSpacing.spacingTopS60XL80}>
        <Grid>
          <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
            {header && (
              <HeaderWithLogo {...header} imageLabel={`${brandName}`} />
            )}
          </GridItem>
        </Grid>
      </div>
      <div
        css={[
          containerSpacing.spacingTopS60XL80,
          containerSpacing.spacingBottomS60XL80,
        ]}
      >
        <SearchByBoard
          title={ui('searchByBoard.interplotedTitle', { name: tirebrand })}
          hasBrand={false}
          hasTireType={false}
          params={searchParams}
          queryParamLabel={tirebrand}
        />
      </div>
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
        <Fragment>
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
        </Fragment>
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
                      linkTarget={'_self'}
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
