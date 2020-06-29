import { mockReviewListing } from '~/components/modules/ReviewListing/ReviewListing.mocks';

import { default as HeaderComponent } from './Header';

export default {
  component: Header,
  title: 'SEO Landing/Review Listing/Header',
};

export function Header() {
  const { breadcrumbs, description, filters, header } = mockReviewListing;

  return (
    <HeaderComponent
      breadcrumbs={breadcrumbs}
      description={description}
      header={header}
      filters={filters}
    />
  );
}
