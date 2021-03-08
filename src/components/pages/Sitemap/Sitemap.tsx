import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import { footerLinksData } from '~/components/modules/Footer/Footer.data';
import { useSiteMenuContext } from '~/context/SiteMenu.context';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { SiteMenu } from '~/data/models/SiteMenu';
import { ROUTE_MAP, ROUTES, THEME } from '~/lib/constants';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { getLegacyAccountURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';

import { learnTiresLinks } from './Sitemap.constants';
import styles from './Sitemap.styles';

interface SiteMapProps {
  brandList: Array<SiteLinkWithLabel>;
  categoryList: Array<SiteLinkWithLabel>;
  tireSizeList: Array<SiteLinkWithLabel>;
  typeList: Array<SiteLinkWithLabel>;
  vehicleList: Array<SiteLinkWithLabel>;
}
interface LinkShape {
  action: string;
  isExternal?: boolean;
  subLinks?: Array<SiteLinkWithLabel>;
  text: string;
}
interface LinkList {
  links: LinkShape[];
  text: string;
}

function getGlobalNavLinks(
  siteMenu: SiteMenu,
  brandList: Array<SiteLinkWithLabel>,
  typeList: Array<SiteLinkWithLabel>,
  categoryList: Array<SiteLinkWithLabel>,
  vehicleList: Array<SiteLinkWithLabel>,
  tireSizeList: Array<SiteLinkWithLabel>,
  learnTiresLinks: Array<SiteLinkWithLabel>,
): Array<LinkList | LinkShape> {
  const browseLinks: LinkShape[] = [];
  const tires101Links: LinkShape[] = [];
  const tires101LinksSitemap = footerLinksData.tires.links.filter(
    (linkItem) =>
      linkItem.action !== ROUTE_MAP[ROUTES.VEHICLES] &&
      linkItem.action !== ROUTE_MAP[ROUTES.TIRE_SIZES_LANDING],
  );
  tires101LinksSitemap.forEach((tires101) => {
    if (tires101.text === ui('learnAboutTires')) {
      tires101Links.push({
        text: tires101.text,
        action: tires101.action,
        subLinks: learnTiresLinks,
      });
    } else {
      tires101Links.push({
        text: tires101.text,
        action: tires101.action,
      });
    }
  });
  siteMenu.siteMenuBrowseList.forEach((browseList) =>
    browseList.siteMenuBrowseGroupList.forEach((browseGroupList) => {
      if (!browseGroupList.more) {
        return;
      }
      const label = browseGroupList.header?.title
        ? browseGroupList.header?.title
        : `Shop by ${browseList.title.toLowerCase()}`;
      switch (label) {
        case 'Shop by brand':
          browseLinks.push({
            text: ui('sitemap.brandSectionTitle'),
            action: browseGroupList.more.link.href,
            subLinks: brandList,
          });
          break;
        case 'Vehicle type':
          browseLinks.push({
            text: ui('sitemap.vehicleTypeSectionTitle'),
            action: browseGroupList.more.link.href,
            subLinks: typeList,
          });
          break;
        case 'Tire category':
          browseLinks.push({
            text: ui('sitemap.tireCategorySectionTitle'),
            action: browseGroupList.more.link.href,
            subLinks: categoryList,
          });
          break;
        default:
          browseLinks.push({
            text: label,
            action: browseGroupList.more.link.href,
          });
          break;
      }
    }),
  );
  browseLinks.push(
    {
      text: ui('sitemap.vehicleSectionTitle'),
      action: '/',
      subLinks: vehicleList,
    },
    {
      text: ui('sitemap.tireSizeSectionTitle'),
      action: '/',
      subLinks: tireSizeList,
    },
  );

  return [
    {
      text: ui('links.browseTires'),
      links: browseLinks,
    },
    {
      text: ui('footer.tires'),
      links: tires101Links,
    },
    {
      text: 'Deals on tires',
      action: ROUTE_MAP[ROUTES.DEALS],
    },
    {
      text: ui('links.account'),
      action: getLegacyAccountURL(),
      isExternal: true,
    },
    {
      text: ui('footer.company'),
      links: footerLinksData.company.links,
    },
    {
      text: ui('footer.customerSupport'),
      links: footerLinksData.customerSupport.links,
    },
    {
      text: ui('footer.social'),
      links: footerLinksData.social.links,
    },
  ];
}

function Sitemap(props: SiteMapProps) {
  const {
    brandList,
    typeList,
    categoryList,
    vehicleList,
    tireSizeList,
  } = props;
  const siteMenu = useSiteMenuContext();

  const sitemapLinks = getGlobalNavLinks(
    siteMenu,
    brandList,
    typeList,
    categoryList,
    vehicleList,
    tireSizeList,
    learnTiresLinks,
  );
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      sitemap: ui('breadcrumbs.sitemap'),
    },
    pathname,
    query,
  });
  const meta: MetaProps = {
    title: ui('meta.sitemap.title'),
    description: ui('meta.sitemap.description'),
  };
  return (
    <Grid css={styles.root}>
      <Meta {...meta} />
      <GridItem gridColumnS="2/end" gridColumnM="2/end" gridColumnL="4/12">
        <div css={styles.breadcrumbs}>
          <Breadcrumbs navigationItems={breadcrumbs} />
        </div>
        <h1 css={styles.title}>{ui('breadcrumbs.sitemap')}</h1>
        {sitemapLinks.map((sitemapLink: LinkShape | LinkList, idx) => {
          if ('links' in sitemapLink) {
            return (
              <div css={styles.linkContainer}>
                <h2 css={[styles.linkHeading, styles.linkListTitle]}>
                  {sitemapLink.text}
                </h2>
                {sitemapLink.links.map((link, linkIdx) => {
                  return (
                    <>
                      <Link
                        isExternal={link.isExternal}
                        css={styles.link}
                        theme={THEME.LIGHT}
                        key={linkIdx}
                        href={link.action}
                      >
                        {link.text}
                      </Link>

                      {link.subLinks &&
                        link.subLinks.map((link, index) => (
                          <Link
                            {...link.link}
                            key={index}
                            css={styles.sublink}
                            theme={THEME.LIGHT}
                          >
                            {' '}
                            {link.label}
                          </Link>
                        ))}
                    </>
                  );
                })}
              </div>
            );
          }

          return (
            <div key={idx} css={styles.linkContainer}>
              <Link
                css={styles.linkHeading}
                theme={THEME.LIGHT}
                href={sitemapLink.action}
                isExternal={sitemapLink.isExternal}
              >
                {sitemapLink.text}
              </Link>
            </div>
          );
        })}
      </GridItem>
    </Grid>
  );
}

export default Sitemap;
