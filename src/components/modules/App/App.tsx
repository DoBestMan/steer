import { ReactNode } from 'react';

import Footer from '~/components/global/Footer/Footer';
import ConnectedNav from '~/components/global/Nav/Nav.container';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  const { customerServiceEnabled } = useSiteGlobalsContext();
  const { locationString } = useUserPersonalizationContext();
  return (
    <>
      <ConnectedNav
        isCustomerServiceEnabled={customerServiceEnabled}
        locationString={locationString}
      />
      {children}
      <Footer isCustomerServiceEnabled={customerServiceEnabled} />
    </>
  );
}

export default App;
