import { SiteGlobals } from '~/data/models/SiteGlobals';
import { createCtx } from '~/lib/utils/context';

const SiteGlobalsContext = createCtx<SiteGlobals>();

export const SiteGlobalsContextProvider = SiteGlobalsContext.Provider;

export const useSiteGlobalsContext = SiteGlobalsContext.useContext;
