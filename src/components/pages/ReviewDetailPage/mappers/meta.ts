import { MetaProps } from '~/components/global/Meta/Meta';
import { SiteProduct } from '~/data/models/SiteProduct';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToMeta({
  siteProduct: { siteProductLine },
}: {
  siteProduct: SiteProduct;
}): MetaProps {
  const meta = {
    brand: capitalize(siteProductLine.brand.label),
    productLine: capitalize(siteProductLine.name),
  };

  const title = ui('meta.brands.brand.productLine.reviews.title', meta);
  const description = ui(
    'meta.brands.brand.productLine.reviews.description',
    meta,
  );

  return {
    title,
    description,
  };
}
