import { ReactNode } from 'react';

import { useScroll } from '~/hooks/useScroll';
import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

interface ScrollProps {
  scrollDirection: string;
  scrollY: number;
}

const ScrollContext = createContext<ScrollProps>();

function ScrollContextProvider({ children }: Props) {
  const scroll = useScroll();

  return (
    <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>
  );
}

export default ScrollContextProvider;
export const useScrollContext = ScrollContext.useContext;
