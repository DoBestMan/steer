import { useRouter } from 'next/dist/client/router';
import { ReactNode } from 'react';

import NavContainer from '~/components/modules/Nav/Nav.container';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { isBrowser } from '~/lib/utils/browser';

import FooterContainer from '../Footer/Footer.container';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  const router = useRouter();
  return (
    <>
      {isBrowser() && router?.asPath !== ROUTE_MAP[ROUTES.HOME] && (
        // router has unique rendering + styles on homepage, renders in HomePage.tsx
        <NavContainer isHomepage={false} />
      )}
      {children}
      <FooterContainer />
    </>
  );
}

export default App;
