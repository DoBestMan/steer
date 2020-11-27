import { useRouter } from 'next/router';
import { ComponentType } from 'react';

import LoadingPage from '~/components/global/LoadingPage/LoadingPage';

/* eslint-disable react-hooks/rules-of-hooks */
const WithFallbackPageHandling = <P extends unknown>(
  Component: ComponentType<P>,
): ComponentType<P> => (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingPage />;
  }

  return <Component {...props} />;
};
/* eslint-enable react-hooks/rules-of-hooks */
export default WithFallbackPageHandling;
