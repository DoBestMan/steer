import { MetaProps } from '~/components/global/Meta/Meta';
import {
  capitalize,
  extractFromDiameterFormat,
  tireSizeQueryToTireSize,
  unSlugify,
} from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

export enum SearchBy {
  'brandAndCategoryOrType' = 'brandAndCategoryOrType',
  'tireSize' = 'tireSize',
  'vehicle' = 'vehicle',
}

export interface SearchByParams {
  brand?: string;
  categoryOrType?: string;
  isDiameterRoute?: boolean;
  make?: string;
  model?: string;
  tireSize?: string;
  trim?: string;
  year?: string;
}

interface Props {
  searchBy: SearchBy;
  searchByParams: SearchByParams;
}

export function mapDataToMeta({
  searchBy,
  searchByParams,
}: Props): MetaProps | null {
  switch (searchBy) {
    case 'brandAndCategoryOrType':
      return searchByBrandAndCategoryOrType(searchByParams);

    case 'tireSize':
      return searchByTireSize(searchByParams);

    case 'vehicle':
      return searchByVehicle(searchByParams);

    default:
      return null;
  }
}

function searchByTireSize({
  isDiameterRoute,
  tireSize,
}: SearchByParams): MetaProps {
  const meta = {
    tireSize: tireSizeQueryToTireSize(tireSize),
    categoryOrType: '',
  };

  let title = ui('meta.tireSizes.title', meta);
  let description = ui('meta.tireSizes.description', meta);

  if (isDiameterRoute) {
    const extracted = extractFromDiameterFormat(tireSize);

    if (extracted) {
      meta.tireSize = extracted.size;
      meta.categoryOrType = capitalize(extracted.categoryOrType);

      title = ui('meta.tireSizes.categoriesOrTypes.title', meta);
      description = ui('meta.tireSizes.categoriesOrTypes.description', meta);
    }
  }

  return {
    description,
    title,
  };
}

function searchByBrandAndCategoryOrType({
  brand,
  categoryOrType,
}: SearchByParams): MetaProps {
  const meta = {
    brand: brand ? unSlugify(brand) : '',
    categoryOrType: categoryOrType ? unSlugify(categoryOrType) : '',
  };

  const title = ui('meta.brands.brand.categoriesOrTypes.title', meta);
  const description = ui(
    'meta.brands.brand.categoriesOrTypes.description',
    meta,
  );

  return {
    description,
    title,
  };
}

function searchByVehicle({
  make,
  model,
  trim,
  tireSize,
  year,
}: SearchByParams): MetaProps {
  const meta = {
    make: make ? unSlugify(make) : '',
    model: model ? unSlugify(model) : '',
    tireSize: tireSize ? tireSizeQueryToTireSize(tireSize) : '',
    trim: trim ? trim : '',
    year: year ? unSlugify(year) : '',
  };

  let title = ui('meta.vehicles.make.model.year.title', meta);
  let description = ui('meta.vehicles.make.model.year.description', meta);

  if (tireSize) {
    title = ui('meta.vehicles.make.model.year.tireSize.title', meta);
    description = ui(
      'meta.vehicles.make.model.year.tireSize.description',
      meta,
    );
  }

  return {
    description,
    title,
  };
}
