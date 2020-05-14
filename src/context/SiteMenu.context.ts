import { SiteMenu } from '~/data/models/SiteMenu';
import { createContext } from '~/lib/utils/context';

const SiteMenuContext = createContext<SiteMenu>();

export const SiteMenuContextProvider = SiteMenuContext.Provider;

export const useSiteMenuContext = SiteMenuContext.useContext;
