import { createContext, useContext } from 'react';

import { SiteGlobals } from '~/data/models/SiteGlobals';

export const SiteGlobalsContext = createContext<SiteGlobals | null>(null);

export default SiteGlobalsContext;
export const useSiteGlobalsContext = () => useContext(SiteGlobalsContext);
