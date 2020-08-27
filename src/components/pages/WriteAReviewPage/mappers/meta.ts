import { MetaProps } from '~/components/global/Meta/Meta';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToMeta({
  brand,
  productLine,
}: {
  brand: string;
  productLine: string;
}): MetaProps {
  const meta = {
    brand: capitalize(brand),
    productLine: capitalize(productLine),
  };

  const title = ui('meta.brands.brand.productLine.writeAReview.title', meta);
  const description = ui(
    'meta.brands.brand.productLine.writeAReview.description',
    meta,
  );

  return {
    title,
    description,
    hasCanonical: false,
    robots: 'noindex,nofollow',
  };
}
