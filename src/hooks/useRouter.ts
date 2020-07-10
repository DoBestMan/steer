import { NextRouter, useRouter as useNextRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Router {
  onRouteChange?(): void;
}

export function useRouter({ onRouteChange }: Router): NextRouter {
  const router = useNextRouter();

  const [routePath, setRoutePath] = useState(router.asPath);
  useEffect(() => {
    if (onRouteChange && routePath !== router.asPath) {
      onRouteChange();
    }

    setRoutePath(router.asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return router;
}
