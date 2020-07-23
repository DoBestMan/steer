import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { getDiameterCategory } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SearchBy } from '~/components/pages/CatalogPage/mapppers/meta';
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
    />
  );
}

export const getServerSideProps: GetServerSideProps<CatalogPageData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { size, ...vehicleParams } = context.query;

  if (isRouteDiameterFormat(context.req.url)) {
    const { category, diameter } = getDiameterCategory(size);
    const diameterApiArgs = {
      category,
      diameter,
      query: getStringifiedParams(vehicleParams),
    };

    const { siteCatalogSummary } = await backendGetTireSizeDiameterSummary(
      diameterApiArgs,
    );
    const { siteCatalogProducts } = await backendGetTireSizeDiameterProducts(
      diameterApiArgs,
    );

    return {
      props: {
        size,
        serverData: { siteCatalogSummary, siteCatalogProducts },
      },
    };
  }

  const classicApiArgs = {
    size,
    query: getStringifiedParams(vehicleParams),
  };
  const { siteCatalogSummary } = await backendGetTireSizeClassicSummary(
    classicApiArgs,
  );
  const { siteCatalogProducts } = await backendGetTireSizeClassicProducts(
    classicApiArgs,
  );

  return {
    props: {
      size,
      serverData: { siteCatalogSummary, siteCatalogProducts },
    },
  };
};

export default TireCategory;
