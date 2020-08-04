import { FeaturedInfoModuleProps } from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { SiteModuleGraphicGridItem } from '~/data/models/SiteModules';
import { LINK_TYPES } from '~/lib/constants';

export const transformGraphicGridData = (
  items: Array<SiteModuleGraphicGridItem>,
): Array<FeaturedInfoModuleProps> => {
  const transformedArray: FeaturedInfoModuleProps[] = [];

  items.forEach((item: SiteModuleGraphicGridItem) => {
    const dataItem: FeaturedInfoModuleProps = {
      ...item,
    };

    if (item.link && item.link.link && item.link.link.href && item.link.label) {
      dataItem.action = {
        as: LINK_TYPES.A,
        href: item.link.link.href,
        text: item.link.label,
      };
    }

    transformedArray.push(dataItem);
  });

  return transformedArray;
};
