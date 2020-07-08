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

export default NotFoundPage;
