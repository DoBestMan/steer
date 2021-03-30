import { useEffect, useState } from 'react';

import { isBrowser } from '~/lib/utils/browser';

export function useClientType() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (!isClient && isBrowser()) {
      setIsClient(true);
    }
  }, [isClient]);

  return { isClient };
}
