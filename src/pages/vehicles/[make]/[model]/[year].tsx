import { GetServerSideProps } from 'next';

import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { shouldDisplayProductsError } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SearchBy } from '~/components/pages/CatalogPage/mapppers/meta';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetVehicleProducts,
  backendGetVehicleSummary,
} from '~/lib/backend/catalog/vehicle';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

interface Props extends CatalogPageData {
  make: string;
  model: string;
  query?: Record<string, string>;
  year: string;
}

function VehicleCatalog({ serverData, make, model, query, year }: Props) {
  const searchBy = SearchBy.vehicle;
  const searchByParams = {
    make,
    model,
    tireSize: query && query.tireSize ? query.tireSize : undefined,
    trim: query && query.trim ? query.trim : undefined,
    year,
  };

  return (
    <CatalogPageContainer
      serverData={serverData}
      endpoints={{
        summary: '/summary-vehicle',
        products: '/products-vehicle',
      }}
      pageParams={{
        make,
        model,
        year,
      }}
      searchBy={searchBy}
      searchByParams={searchByParams}
    />
  );
}

export const getServerSideProps: GetServerSideProps<PageResponse<
  CatalogPageData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { make, model, year, ...vehicleParams } = context.query;
  const formattedMake = removeTireFromQueryParam(make);

  const apiArgs = {
    make: formattedMake,
    model,
    year,
    query: getStringifiedParams(vehicleParams),
  };
  const [{ siteCatalogSummary }, productsRes] = await Promise.all([
    backendGetVehicleSummary(apiArgs),
    backendGetVehicleProducts(apiArgs),
  ]);

  if (
    !productsRes.isSuccess &&
    shouldDisplayProductsError(siteCatalogSummary)
  ) {
    const errorStatusCode = productsRes.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  return {
    props: {
      make: formattedMake,
      model,
      query: getStringifiedParams(vehicleParams),
      serverData: {
        siteCatalogSummary,
        siteCatalogProducts:
          productsRes.isSuccess && productsRes.data
            ? productsRes.data.siteCatalogProducts
            : null,
      },
      year,
    },
  };
};

export default WithErrorPageHandling(VehicleCatalog);
