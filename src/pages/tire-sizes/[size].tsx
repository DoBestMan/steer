import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { CatalogPageData } from '~/components/pages/CatalogPage/CatalogPage.types';
import {
  getDiameterCategory,
  shouldReturnServerError,
} from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SearchBy } from '~/components/pages/CatalogPage/mapppers/meta';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetTireSizeClassicProducts,
  backendGetTireSizeClassicSummary,
} from '~/lib/backend/catalog/size-classic';
import {
  backendGetTireSizeDiameterProducts,
  backendGetTireSizeDiameterSummary,
} from '~/lib/backend/catalog/size-diameter';
import {
  getStringifiedParams,
  isRouteDiameterFormat,
} from '~/lib/utils/routes';
import {
  removeInchFromQueryParam,
  removeTireFromQueryParam,
} from '~/lib/utils/string';

interface Props extends CatalogPageData {
  size: string;
}

function TireCategory({ size, serverData }: Props) {
  const { asPath } = useRouter();
  const isDiameterRoute = isRouteDiameterFormat(asPath);
  const sizeTypeSuffix = isDiameterRoute ? 'diameter' : 'classic';

  const searchBy = SearchBy.tireSize;
  const searchByParams = {
    isDiameterRoute,
    tireSize: size,
  };

  return (
    <CatalogPageContainer
      serverData={serverData}
      endpoints={{
        summary: `/summary-tire-size-${sizeTypeSuffix}`,
        products: `/products-tire-size-${sizeTypeSuffix}`,
      }}
      pageParams={{ size }}
      searchBy={searchBy}
      searchByParams={searchByParams}
      hasDefaultAdvancedView
    />
  );
}

export const getServerSideProps: GetServerSideProps<PageResponse<
  CatalogPageData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { size, ...vehicleParams } = context.query;

  if (isRouteDiameterFormat(context.req.url)) {
    const { category, diameter } = getDiameterCategory(size);
    const diameterApiArgs = {
      category: removeTireFromQueryParam(category),
      diameter: removeInchFromQueryParam(diameter),
      query: getStringifiedParams(vehicleParams),
    };

    const [summaryRes, productsRes] = await Promise.all([
      backendGetTireSizeDiameterSummary(diameterApiArgs),
      backendGetTireSizeDiameterProducts(diameterApiArgs),
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
        size,
        serverData: {
          siteCatalogSummary,
          siteCatalogProducts:
            productsRes.isSuccess && productsRes.data
              ? productsRes.data.siteCatalogProducts
              : null,
        },
      },
    };
  }

  const classicApiArgs = {
    size,
    query: getStringifiedParams(vehicleParams),
  };

  const [summaryRes, productsRes] = await Promise.all([
    backendGetTireSizeClassicSummary(classicApiArgs),
    backendGetTireSizeClassicProducts(classicApiArgs),
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
      size,
      serverData: {
        siteCatalogSummary,
        siteCatalogProducts:
          productsRes.isSuccess && productsRes.data
            ? productsRes.data.siteCatalogProducts
            : null,
      },
    },
  };
};

export default WithErrorPageHandling(TireCategory);
