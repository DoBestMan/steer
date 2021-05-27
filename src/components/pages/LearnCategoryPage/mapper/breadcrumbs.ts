import { ParsedUrlQuery } from 'querystring';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { SiteModuleBreadcrumbsItem } from '~/data/models/SiteModules';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { titleCaseSlug } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapQueryToBreadcrumbs(query: ParsedUrlQuery, label: string) {
  return mapArrayToBreadcrumbs(
    [
      {
        type: ROUTES.HOME,
      },
      {
        label: ui('links.learn'),
        type: ROUTES.LEARN,
      },
      {
        label: titleCaseSlug(query.category?.toString()),
        type: ROUTES.LEARN_CATEGORY,
      },
      {
        label,
        type: ROUTES.LEARN_CATEGORY_SLUG,
      },
    ],
    query,
  );
}

export const transformBreadcrumbsItemLearnPage = (
  breadcrumbList: Array<SiteModuleBreadcrumbsItem>,
  label: string,
  slug: string,
): Array<BreadcrumbsItem> => {
  const resultArray: Array<BreadcrumbsItem> = [];
  breadcrumbList.forEach((breadcrumItem: SiteModuleBreadcrumbsItem) => {
    resultArray.push({
      label:
        breadcrumItem.label == titleCaseSlug(slug) && label //set meta title as label if available.
          ? label
          : breadcrumItem.label,
      url: breadcrumItem.link?.href || '/',
    });
  });
  return resultArray;
};
