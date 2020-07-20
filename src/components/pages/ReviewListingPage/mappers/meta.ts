import { MetaProps } from '~/components/global/Meta/Meta';
import { capitalize, unSlugify } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToMeta({
  brandOrCategoryOrType,
}: {
  brandOrCategoryOrType?: string;
}): MetaProps {
  const meta = {
    brandOrCategoryOrType: brandOrCategoryOrType
      ? capitalize(unSlugify(brandOrCategoryOrType))
      : '',
  };

  const titlePath = brandOrCategoryOrType
    ? 'meta.reviewListingPages.brandOrCategoryOrType.title'
    : 'meta.reviewListingPages.title';
  const descriptionPath = brandOrCategoryOrType
    ? 'meta.reviewListingPages.brandOrCategoryOrType.description'
    : 'meta.reviewListingPages.description';

  const title = ui(titlePath, meta);
  const description = ui(descriptionPath, meta);

  return {
    title,
    description,
  };
}
