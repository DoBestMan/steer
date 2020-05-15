import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import Footer from './Footer';

function FooterContainer() {
  const { customerServiceEnabled } = useSiteGlobalsContext();
  return <Footer isCustomerServiceEnabled={customerServiceEnabled} />;
}

export default FooterContainer;
