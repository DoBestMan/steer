import { MetaProps } from '~/components/global/Meta/Meta';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToMeta({
  brand,
  productLine,
  tireSize,
}: {
  brand: string;
  productLine: string;
  tireSize?: string;
}): MetaProps {
  const meta = {
    brand: capitalize(brand),
    productLine: capitalize(productLine),
    tireSize: tireSize ? tireSize : '',
  };

  const titlePath = tireSize
    ? 'meta.brands.brand.productLine.pdp.title'
    : 'meta.brands.brand.productLine.title';
  const descriptionPath = tireSize
    ? 'meta.brands.brand.productLine.pdp.description'
    : 'meta.brands.brand.productLine.description';

  const title = ui(titlePath, meta);
  const description = ui(descriptionPath, meta);

  return {
    title,
    description,
  };
}
