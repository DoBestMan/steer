import { brands } from '~/components/pages/SEOPage/BrandHubPage/BrandHub.mock';
import BrandHubPage from '~/components/pages/SEOPage/BrandHubPage/BrandHubPage';

function Brands() {
  return <BrandHubPage brandListItems={brands} />;
}

export default Brands;
