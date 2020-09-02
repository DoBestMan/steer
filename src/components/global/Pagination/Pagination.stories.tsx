import { useState } from 'react';

import { SiteLink } from '~/data/models/SiteLink';

import Pagination from './Pagination';

const pageItems: Array<{ link: SiteLink }> = Array(20)
  .fill(0)
  .map((_, index) => {
    return {
      link: {
        isExternal: false,
        href: `/?page=${index + 1}`,
      },
    };
  });

export default {
  component: Pagination,
  title: 'Global/Pagination',
};

export function PaginationWithKnobs() {
  const [, setPageNumber] = useState<number>();
  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();
    setPageNumber(page);
  };

  return (
    <Pagination
      pageItems={pageItems}
      onPageChange={handlePageChange}
      initialPage={3}
    />
  );
}
