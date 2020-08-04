import { SiteModuleBreadcrumbsItem } from '~/data/models/SiteModules';

export const breadcrumbData: Array<SiteModuleBreadcrumbsItem> = [
  {
    type: 'SiteLinkWithLabel',
    label: 'Home',
    link: {
      href: '/',
      isExternal: false,
    },
  },
  {
    type: 'SiteLinkWithLabel',
    label: 'Tire Deals',
    link: {
      href: '/tire-deals',
      isExternal: false,
    },
  },
];
