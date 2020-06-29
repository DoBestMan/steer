import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import SearchModal from '~/components/modules/Search/SearchModal';
import { NavContextProvider } from '~/context/Nav.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';

import FooterContainer from '../Footer/Footer.container';
import { styles } from './App.styles';

interface Props {
  children: ReactNode;
  route: string;
}

const NavContainer = dynamic(() =>
  import('~/components/modules/Nav/Nav.container'),
);

function App({ children, route }: Props) {
  const isHomepage = route === ROUTE_MAP[ROUTES.HOME];

  return (
    <div css={[styles.root, isHomepage && styles.rootWithOffWhiteBg]}>
      <NavContextProvider>
        <NavContainer isHomepage={isHomepage} />
        {children}
      </NavContextProvider>
      <FooterContainer />
      <SearchModal />
    </div>
  );
}

export default App;
