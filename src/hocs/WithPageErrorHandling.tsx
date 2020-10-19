import { ComponentType } from 'react';

import Error from '~/pages/_error';

export type PageResponse<T> = T | { errorStatusCode: number };

const WithErrorPageHandling = <P extends unknown>(
  Component: ComponentType<P>,
): ComponentType<PageResponse<P>> =>
  function (props) {
    if ('errorStatusCode' in props) {
      return <Error statusCode={props.errorStatusCode} />;
    }

    return <Component {...props} />;
  };

export default WithErrorPageHandling;
