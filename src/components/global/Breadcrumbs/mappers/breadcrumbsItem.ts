import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { SiteModuleBreadcrumbsItem } from '~/data/models/SiteModules';

export const transformBreadcrumbsItem = (
  breadcrumbList: Array<SiteModuleBreadcrumbsItem>,
): Array<BreadcrumbsItem> => {
  const resultArray: Array<BreadcrumbsItem> = [];
  breadcrumbList.forEach((breadcrumItem: SiteModuleBreadcrumbsItem) => {
    resultArray.push({
      label: breadcrumItem.label,
      url: breadcrumItem.link?.href || '/',
    });
  });
  return resultArray;
};
