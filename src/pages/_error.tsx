import { NextPageContext } from 'next';

import ErrorPage from '~/components/pages/ErrorPage/ErrorPage';
import { ui } from '~/lib/utils/ui-dictionary';

interface Props {
  statusCode: number;
}

function Error({ statusCode }: Props) {
  const is404 = statusCode === 404;
  const description = is404
    ? ui('error.notFoundDescription')
    : ui('error.erroDescription');
  const copy = is404 ? ui('error.callCopy') : undefined;

  return (
    <ErrorPage
      copy={copy}
      errorCode={statusCode}
      description={description}
      hasHomeButton={is404}
    />
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
