import { SiteProductInsights } from '~/data/models/SiteProductInsights';
import { SiteProductInstallation } from '~/data/models/SiteProductInstallation';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { SiteProductLineSizeDetail } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductPromotion } from '~/data/models/SiteProductPromotion';
import { SiteProductSpecsItem } from '~/data/models/SiteProductSpecsItem';

import { fetch } from '../fetch';

export async function backendGetProductDetail({
  brand,
  productLine,
  query,
}: {
  brand: string | string[];
  productLine: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetch<{
    siteProductInsights: SiteProductInsights;
    siteProductInstallation: SiteProductInstallation | null;
    siteProductLine: SiteProductLine;
    siteProductLineAvailableSizeList: Array<SiteProductLineAvailableSizeItem>;
    siteProductLineRearSizeDetail: SiteProductLineSizeDetail | null;
    siteProductLineSizeDetail: SiteProductLineSizeDetail | null;
    siteProductPromotions: Array<SiteProductPromotion>;
    siteProductRecirculation: Array<object>;
    siteProductSpecs: Array<SiteProductSpecsItem>;
  }>({
    endpoint: `/v1/site/products/${brand}/${productLine}`,
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
