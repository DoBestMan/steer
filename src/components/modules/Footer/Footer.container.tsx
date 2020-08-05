import { useRouter } from 'next/router';

import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { trimSlash } from '~/lib/utils/routes';

import Footer from './Footer';

const ROUTES_WITHOUT_PROMOS: string[] = [trimSlash(ROUTE_MAP[ROUTES.SITEMAP])];

function FooterContainer() {
  const { pathname } = useRouter();
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();
  return (
    <Footer
      customerServiceNumber={customerServiceNumber}
      isCustomerServiceEnabled={customerServiceEnabled}
      showPromotions={!ROUTES_WITHOUT_PROMOS.includes(trimSlash(pathname))}
    />
  );
}

export default FooterContainer;
