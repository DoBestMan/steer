import { SiteBrands } from '~/data/models/SiteBrands';
import { SiteDeals } from '~/data/models/SiteDeals';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteMenu } from '~/data/models/SiteMenu';
import { SiteReviews } from '~/data/models/SiteReviews';

import { fetch } from '../fetch';

export async function backendGetSiteGlobals() {
  const response = await fetch<{
    siteGlobals: SiteGlobals;
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
  const response = await fetch<SiteMenu>({
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

export async function backendGetSiteDeals() {
  const response = await fetch<SiteDeals>({
    endpoint: '/v1/site/deals',
    includeAuthorization: true,
    method: 'get',
  });
  return response;
}
export async function backendGetSiteBrands() {
  const response = await fetch<SiteBrands>({
    endpoint: '/v1/site/brands',
    includeAuthorization: true,
    method: 'get',
  });
  return response;
}
