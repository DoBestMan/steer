import { GetServerSideProps } from 'next';

import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetBrandProducts,
  backendGetBrandSummary,
} from '~/lib/backend/catalog/brand';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

interface Props extends CatalogPageData {
  brand: string;
  categoryOrType: string;
}

function BrandCategory({ brand, categoryOrType, serverData }: Props) {
  return (
    <CatalogPageContainer
      serverData={serverData}
      endpoints={{
        summary: '/summary-brand',
        products: '/products-brand',
      }}
      hasTopPicks={
        !!serverData.siteCatalogSummary.siteCatalogSummaryTopPicksList.length
      }
      pageParams={{
        brand,
        categoryOrType,
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps<CatalogPageData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brand, categoryOrType, ...vehicleParams } = context.query;
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
