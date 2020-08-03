import { COLORS } from '~/lib/constants';

import ReviewForm from './ReviewForm';

export default {
  component: ReviewForm,
  title: 'SEO Landing/Write Review',
};

export function Form() {
  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.WHITE }}>
      <ReviewForm
        brand="Continental"
        tire="PureContact LS"
        queryParams={{
          brand: 'continental-tires',
          productLine: 'surecontact-rx',
        }}
      />
    </div>
  );
}
