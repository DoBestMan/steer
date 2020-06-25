import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import Footer from './Footer';

function FooterContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();
  return (
    <Footer
      customerServiceNumber={customerServiceNumber}
      isCustomerServiceEnabled={customerServiceEnabled}
    />
  );
}

export default FooterContainer;
