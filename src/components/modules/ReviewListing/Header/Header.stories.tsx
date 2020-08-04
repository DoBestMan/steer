import { mockReviewListing } from '~/components/modules/ReviewListing/ReviewListing.mocks';

import { default as HeaderComponent } from './Header';

export default {
  component: Header,
  title: 'SEO Landing/Review Listing/Header',
};

export function Header() {
  const { breadcrumbs, body, filters, title } = mockReviewListing;

  return (
    <HeaderComponent
      breadcrumbs={breadcrumbs}
      body={body}
      title={title}
      filters={filters}
    />
  );
}
