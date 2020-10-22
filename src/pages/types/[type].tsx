import { GetServerSideProps } from 'next';

import TypePage, {
  TypePageProps,
} from '~/components/pages/SEOPage/TypePage/TypePage';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTypeTireData } from '~/lib/backend/type';
import { AsyncResponse } from '~/lib/fetch/index.types';
import { validTiresQuery } from '~/lib/utils/regex';
import { validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Type(props: TypePageProps) {
  return <TypePage typeData={props} />;
}
export const getServerSideProps: GetServerSideProps<PageResponse<
  TypePageProps
>> = async (context) => {
  backendBootstrap();
  const { type } = context.query;
  const isRouteValid = validateRoute(type, validTiresQuery);

  if (!isRouteValid) {
    return { props: { errorStatusCode: 404 } };
  }
  const formattedType = removeTireFromQueryParam(type);
  const serverData: AsyncResponse<TypePageProps> = await backendGetTypeTireData(
    formattedType,
  );
  if (!serverData.isSuccess) {
    const errorStatusCode = !serverData.isSuccess
      ? serverData.error.statusCode
      : 500;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }
  return {
    props: {
      ...serverData.data,
    },
  };
};
export default WithErrorPageHandling(Type);
