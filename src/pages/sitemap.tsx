import { GetStaticProps } from 'next';

import { ButtonProps } from '~/components/global/Button/Button';
import Sitemap from '~/components/pages/Sitemap/Sitemap';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { SiteModuleButtonGrid } from '~/data/models/SiteModules';
import { OpenTemplateModules } from '~/data/models/SiteOpenTemplate';
import {
  backendGetSiteBrands,
  backendGetSiteCategories,
  backendGetSiteTypes,
  backendGetSiteVehicles,
} from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { REVALIDATE } from '~/lib/constants';

interface SiteMapServeData {
  serverData: {
    brandList: Array<SiteLinkWithLabel>;
    categoryList: Array<SiteLinkWithLabel>;
    tireSizeList: Array<SiteLinkWithLabel>;
    typeList: Array<SiteLinkWithLabel>;
    vehicleList: Array<SiteLinkWithLabel>;
  };
}

function SitemapPage(props: SiteMapServeData) {
  return (
    <Sitemap
      brandList={props.serverData.brandList}
      typeList={props.serverData.typeList}
      categoryList={props.serverData.categoryList}
      vehicleList={props.serverData.vehicleList}
      tireSizeList={props.serverData.tireSizeList}
    />
  );
}

function getTireSizePageList(tireSize?: OpenTemplateModules[]) {
  const tireSizeList: Array<SiteLinkWithLabel> = [];
  tireSize?.forEach((tireSizeModules: OpenTemplateModules) => {
    if (tireSizeModules.type === 'SiteModuleButtonGrid') {
      const buttonGridData: SiteModuleButtonGrid =
        'buttonGridList' in tireSizeModules
          ? tireSizeModules
          : { type: 'SiteModuleButtonGrid', buttonGridList: [] };
      const buttonGridListItem = buttonGridData.buttonGridList
        ? buttonGridData.buttonGridList
        : [];
      buttonGridListItem.forEach((buttonData: ButtonProps) => {
        tireSizeList.push({
          label: '' + buttonData.children,
          link: {
            href: 'href' in buttonData ? buttonData.href : '/',
            isExternal: buttonData.isExternal ? buttonData.isExternal : false,
          },
        });
      });
    }
  });
  return tireSizeList;
}
export const getStaticProps: GetStaticProps<SiteMapServeData> = async () => {
  backendBootstrap();

  const [
    siteBrands,
    siteTypeList,
    siteCategoryList,
    siteVehicleList,
    siteSizeList,
  ] = await Promise.all([
    backendGetSiteBrands(),
    backendGetSiteTypes(),
    backendGetSiteCategories(),
    backendGetSiteVehicles(),
    await backendGetPageSlug('tire-sizes'),
  ]);
  const brandList: Array<SiteLinkWithLabel> = siteBrands.allBrands.map(
    (brand) => {
      return { label: brand.title, link: brand.link };
    },
  );
  const typeList: Array<SiteLinkWithLabel> = siteTypeList.types.map((type) => {
    return { label: type.title, link: type.link };
  });
  const categoryList: Array<SiteLinkWithLabel> = siteCategoryList.categories.map(
    (category) => {
      return { label: category.title, link: category.link };
    },
  );
  const vehicleList: Array<SiteLinkWithLabel> = siteVehicleList.allMakes.map(
    (vehicleMake) => {
      return { label: vehicleMake.title, link: vehicleMake.link };
    },
  );
  const tireSizeList: Array<SiteLinkWithLabel> = siteSizeList.isSuccess
    ? getTireSizePageList(siteSizeList.data.modules)
    : [];

  return {
    props: {
      serverData: {
        brandList,
        categoryList,
        tireSizeList,
        typeList,
        vehicleList,
      },
    },
    revalidate: REVALIDATE.EVERY_DAY,
  };
};

export default SitemapPage;
