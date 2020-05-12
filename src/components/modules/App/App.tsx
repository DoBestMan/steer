import { useRouter } from 'next/dist/client/router';
import { ReactNode } from 'react';

import Footer from '~/components/modules/Footer/Footer';
import NavContainer from '~/components/modules/Nav/Nav.container';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { isBrowser } from '~/lib/utils/browser';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  const { customerServiceEnabled } = useSiteGlobalsContext();
  const router = useRouter();
  return (
    <>
      {isBrowser() && router?.asPath !== ROUTE_MAP[ROUTES.HOME] && (
        // router has unique rendering + styles on homepage, renders in HomePage.tsx
        <NavContainer
          isHomepage={false}
          isCustomerServiceEnabled={customerServiceEnabled}
        />
      )}
      {children}
      <Footer isCustomerServiceEnabled={customerServiceEnabled} />
    </>
  );
}

export default App;
