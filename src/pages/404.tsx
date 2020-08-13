import ErrorPage from '~/components/pages/ErrorPage/ErrorPage';
import { ui } from '~/lib/utils/ui-dictionary';

function NotFoundPage() {
  return (
    <ErrorPage
      errorCode="404"
      description={ui('error.notFoundDescription')}
      hasHomeButton
    />
  );
}

// Empty `getStaticProps` forces this page to be static
// https://github.com/SimpleTire/steer/blob/dev/docs/DATA_FETCHING.md#pages-without-fetches
export function getStaticProps() {
  return {
    props: {},
  };
}

export default NotFoundPage;
