import { ReactNode } from 'react';

import Footer from '~/components/modules/Footer/Footer';
import NavContainer from '~/components/modules/Nav/Nav.container';
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
      <NavContainer
        isCustomerServiceEnabled={customerServiceEnabled}
        locationString={locationString}
      />
      {children}
      <Footer isCustomerServiceEnabled={customerServiceEnabled} />
    </>
  );
}

export default App;
