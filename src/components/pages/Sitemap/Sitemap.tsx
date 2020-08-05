import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { data as footerLinks } from '~/components/modules/Footer/Footer.data';
import { useSiteMenuContext } from '~/context/SiteMenu.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { ROUTE_MAP, ROUTES, THEME } from '~/lib/constants';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Sitemap.styles';

interface LinkShape {
  action: string;
  text: string;
}
interface LinkList {
  links: LinkShape[];
  text: string;
}

const ST_BASE_URL = 'https://simpletire.com/';

function getGlobalNavLinks(siteMenu: SiteMenu): Array<LinkList | LinkShape> {
  const learnLinks = siteMenu.siteMenuLearn.list.map((listItem) => ({
    action: listItem.link.href,
    text: listItem.label,
  }));
  const browseLinks: LinkShape[] = [];
  siteMenu.siteMenuBrowseList.forEach((browseList) =>
    browseList.siteMenuBrowseGroupList.forEach((browseGroupList) => {
      if (!browseGroupList.more) {
        return;
      }
      const label = browseGroupList.header?.title
        ? browseGroupList.header?.title
        : `Shop by ${browseList.title.toLowerCase()}`;
      browseLinks.push({
        text: label,
        action: browseGroupList.more.link.href,
      });
    }),
  );

  return [
    {
      text: ui('links.browseTires'),
      links: browseLinks,
    },
    {
      text: ui('links.learn'),
      links: learnLinks,
    },
    {
      text: ui('links.deals'),
      action: ROUTE_MAP[ROUTES.DEALS],
    },
    {
      text: ui('links.account'),
      action: `${ST_BASE_URL}/MyCustomers/account`,
    },
    {
      text: ui('links.orderTracking'),
      action: ROUTE_MAP[ROUTES.ORDER_TRACKING],
    },
    {
      text: ui('footer.company'),
      links: footerLinks.company.links,
    },
    {
      text: ui('footer.social'),
      links: footerLinks.social.links,
    },
  ];
}

function Sitemap() {
  const siteMenu = useSiteMenuContext();
  const sitemapLinks = getGlobalNavLinks(siteMenu);
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

  return (
    <Grid css={styles.root}>
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
                {sitemapLink.links.map((link, linkIdx) => (
                  <Link
                    css={styles.link}
                    theme={THEME.LIGHT}
                    key={linkIdx}
                    href={link.action}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <div key={idx} css={styles.linkContainer}>
              <Link
                css={styles.linkHeading}
                theme={THEME.LIGHT}
                href={sitemapLink.action}
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
