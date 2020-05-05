import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { SiteReviews } from '~/data/models/SiteReviews';

import { backendFetch } from './fetch';

export async function backendGetSiteGlobals() {
  const response = await backendFetch<{
    siteHero: SiteHero;
    siteInsights: SiteInsights;
  }>({
    endpoint: './site/globals',
    method: 'get',
  });

  return response;
}

export async function backendGetSiteHome() {
  const response = await backendFetch<{
    siteHero: SiteHero;
    siteInsights: SiteInsights;
  }>({
    endpoint: './site/home',
    includeUserRegion: true,
    includeUserZip: true,
    method: 'get',
  });

  return response;
}

export async function backendGetSiteMenu() {
  const response = await backendFetch<{
    siteMenuBrowseList: Array<SiteMenuBrowseItem>;
    siteMenuLearn: SiteMenuLearn;
  }>({
    endpoint: './site/menu',
    includeUserRegion: true,
    method: 'get',
  });

  return response;
}

export async function backendGetSiteReviews() {
  const response = await backendFetch<{
    siteReviews: SiteReviews;
  }>({
    endpoint: './site/reviews',
    method: 'get',
  });

  return response;
}
