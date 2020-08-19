import { GetServerSideProps } from 'next';

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { CatalogPageData } from '~/components/pages/CatalogPage/CatalogPage.types';
import { shouldReturnServerError } from '~/components/pages/CatalogPage/CatalogPage.utils';
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
  const [summaryRes, productsRes] = await Promise.all([
    backendGetVehicleSummary(apiArgs),
    backendGetVehicleProducts(apiArgs),
  ]);

  if (!summaryRes.isSuccess) {
    const errorStatusCode = summaryRes.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  const siteCatalogSummary = summaryRes.data.siteCatalogSummary;
  if (shouldReturnServerError(productsRes, siteCatalogSummary)) {
    const errorStatusCode = !productsRes.isSuccess
      ? productsRes.error.statusCode
      : 500;
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
