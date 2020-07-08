import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteProduct } from '~/data/models/SiteProduct';

export function mapDataToRecirculation({
  siteProduct: { siteProductRecirculation },
}: {
  siteProduct: SiteProduct;
}): SiteCatalogProductGroupList | null {
  if (!siteProductRecirculation?.length) {
    return null;
  }

  return siteProductRecirculation;
}
