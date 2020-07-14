import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import ReviewForm from '~/components/modules/WriteReview/ReviewForm/ReviewForm';

export interface WriteAReviewServerData {
  serverData: {
    tire: string;
  };
}

function WriteAReviewPage({ serverData: { tire } }: WriteAReviewServerData) {
  return (
    <div css={navigationPaddingTop}>
      {/* TODO: properly assemble page and add breadcrumbs during page assembly WCS-828 */}
      <ReviewForm tire={tire} />
    </div>
  );
}

export default WriteAReviewPage;
