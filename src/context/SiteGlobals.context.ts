import { SiteGlobals } from '~/data/models/SiteGlobals';
import { createContext } from '~/lib/utils/context';

const SiteGlobalsContext = createContext<SiteGlobals>();

export const SiteGlobalsContextProvider = SiteGlobalsContext.Provider;

export const useSiteGlobalsContext = SiteGlobalsContext.useContext;
