import { ComponentType } from 'react';

import Error from '~/pages/_error';

export type PageResponse<T> = T | { errorStatusCode: number };

const WithErrorPageHandling = <P extends {}>(
  Component: ComponentType<P>,
): ComponentType<PageResponse<P>> => (props) => {
  if ('errorStatusCode' in props) {
    return <Error statusCode={props.errorStatusCode} />;
  }

  return <Component {...props} />;
};

export default WithErrorPageHandling;
