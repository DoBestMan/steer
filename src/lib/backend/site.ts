import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { SiteReviews } from '~/data/models/SiteReviews';

import { fetch } from '../fetch';

export async function backendGetSiteGlobals() {
  const response = await fetch<{
    siteHero: SiteHero;
    siteInsights: SiteInsights;
  }>({
    endpoint: '/v1/site/globals',
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}

export async function backendGetSiteHome() {
  const response = await fetch<{
    siteHero: SiteHero;
    siteInsights: SiteInsights;
  }>({
    endpoint: '/v1/site/home',
    includeAuthorization: true,
    includeUserRegion: true,
    includeUserZip: true,
    method: 'get',
  });

  return response;
}

export async function backendGetSiteMenu() {
  const response = await fetch<{
    siteMenuBrowseList: Array<SiteMenuBrowseItem>;
    siteMenuLearn: SiteMenuLearn;
  }>({
    endpoint: '/v1/site/menu',
    includeAuthorization: true,
    includeUserRegion: true,
    method: 'get',
  });

  return response;
}

export async function backendGetSiteReviews() {
  const response = await fetch<{
    siteReviews: SiteReviews;
  }>({
    endpoint: '/v1/site/reviews',
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
