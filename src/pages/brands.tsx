import { GetStaticProps } from 'next';

import BrandHubPage from '~/components/pages/SEOPage/BrandHubPage/BrandHubPage';
import { SiteBrands } from '~/data/models/SiteBrands';
import { backendGetSiteBrands } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { REVALIDATE } from '~/lib/constants';

interface BrandsServeData {
  serverData: SiteBrands;
}

function Brands(props: BrandsServeData) {
  return (
    <BrandHubPage
      allBrands={props.serverData.allBrands}
      popularBrands={props.serverData.popularBrands}
    />
  );
}
export const getStaticProps: GetStaticProps<BrandsServeData> = async () => {
  backendBootstrap();

  const siteBrands = await backendGetSiteBrands();

  const props: BrandsServeData = {
    serverData: {
      allBrands: siteBrands.allBrands,
      popularBrands: siteBrands.popularBrands,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};
export default Brands;
