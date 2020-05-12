import { ReactNode } from 'react';

import Footer from '~/components/modules/Footer/Footer';
import NavContainer from '~/components/modules/Nav/Nav.container';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  const { customerServiceEnabled } = useSiteGlobalsContext();
  return (
    <>
      <NavContainer isCustomerServiceEnabled={customerServiceEnabled} />
      {children}
      <Footer isCustomerServiceEnabled={customerServiceEnabled} />
    </>
  );
}

export default App;
