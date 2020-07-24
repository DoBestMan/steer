import { GetServerSideProps } from 'next';

import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { SearchBy } from '~/components/pages/CatalogPage/mapppers/meta';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetBrandProducts,
  backendGetBrandSummary,
} from '~/lib/backend/catalog/brand';
import { validBrandQuery } from '~/lib/utils/regex';
import {
  getStringifiedParams,
  validateOrRedirectToNotFound,
} from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

interface Props extends CatalogPageData {
  brand: string;
  categoryOrType: string;
}

function BrandCategory({ brand, categoryOrType, serverData }: Props) {
  const searchBy = SearchBy.brandAndCategoryOrType;
  const searchByParams = {
    brand,
    categoryOrType,
  };

  return (
    <CatalogPageContainer
      serverData={serverData}
      endpoints={{
        summary: '/summary-brand',
        products: '/products-brand',
      }}
      pageParams={{
        brand,
        categoryOrType,
      }}
      searchBy={searchBy}
      searchByParams={searchByParams}
    />
  );
}

export const getServerSideProps: GetServerSideProps<CatalogPageData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brand, categoryOrType, ...vehicleParams } = context.query;

  validateOrRedirectToNotFound({
    param: brand,
    pattern: validBrandQuery,
    response: context.res,
  });

  const brandName = removeTireFromQueryParam(brand);
  const apiArgs = {
    brand: brandName,
    category: categoryOrType,
    query: getStringifiedParams(vehicleParams),
  };
  const { siteCatalogSummary } = await backendGetBrandSummary(apiArgs);
  const { siteCatalogProducts } = await backendGetBrandProducts(apiArgs);

  return {
    props: {
      brand: brandName,
      categoryOrType,
      serverData: { siteCatalogSummary, siteCatalogProducts },
    },
  };
};

export default BrandCategory;
