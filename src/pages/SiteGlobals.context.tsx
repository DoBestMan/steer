import { createContext } from 'react';

import { SiteGlobals } from '~/data/models/SiteGlobals';

const SiteGlobalsContext = createContext<SiteGlobals | null>(null);

export default SiteGlobalsContext;
