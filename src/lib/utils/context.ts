import { createContext, useContext } from 'react';

// Create context without worrying about undefined values
// https://www.carlrippon.com/react-context-with-typescript-p4/
export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) {
      throw new Error('useCtx must be inside a Provider with a value');
    }
    return c;
  }
  return { Provider: ctx.Provider, useContext: useCtx } as const;
}
