import {
  createContext as createContextReact,
  useContext as useReactContext,
} from 'react';

// Create context without worrying about undefined values
// https://www.carlrippon.com/react-context-with-typescript-p4/
export function createContext<ContextType>() {
  const context = createContextReact<ContextType | undefined>(undefined);
  function useContext() {
    const contextValue = useReactContext(context);
    if (!contextValue) {
      throw new Error('useContext must be inside a Provider with a value');
    }
    return contextValue;
  }
  return { Provider: context.Provider, useContext } as const;
}
