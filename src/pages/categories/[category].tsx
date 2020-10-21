import { GetServerSideProps } from 'next';

import CategoryPage, {
  CategoryPageProps,
} from '~/components/pages/CategoryPage/CategoryPage';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetCategoryTireData } from '~/lib/backend/category';
import { AsyncResponse } from '~/lib/fetch/index.types';
import { validTiresQuery } from '~/lib/utils/regex';
import { validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Category(props: CategoryPageProps) {
  return <CategoryPage categoryData={props} />;
}
export const getServerSideProps: GetServerSideProps<PageResponse<
  CategoryPageProps
>> = async (context) => {
  backendBootstrap();
  const { category = '' } = context.query;
  const isRouteValid = validateRoute(category, validTiresQuery);

  if (!isRouteValid) {
    return { props: { errorStatusCode: 404 } };
  }
  const formattedCategory = removeTireFromQueryParam(category);
  const serverData: AsyncResponse<CategoryPageProps> = await backendGetCategoryTireData(
    formattedCategory,
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
export default WithErrorPageHandling(Category);
