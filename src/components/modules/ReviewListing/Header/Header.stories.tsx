import { reviewListingMock } from '~/components/modules/ReviewListing/ReviewListing.mock';

import { default as HeaderComponent } from './Header';

export default {
  component: Header,
  title: 'SEO Landing/Review Listing/Header',
};

export function Header() {
  const { breadcrumbs, body, filters, title } = reviewListingMock;

  return (
    <HeaderComponent
      breadcrumbs={breadcrumbs}
      body={body}
      title={title}
      filters={filters}
    />
  );
}
