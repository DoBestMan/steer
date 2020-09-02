import { useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteLink } from '~/data/models/SiteLink';
import { ui } from '~/lib/utils/ui-dictionary';

import PageItem from './PageItem';
import styles from './Pagination.styles';

interface Props {
  initialPage?: number;
  onPageChange?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: number,
  ) => void;
  pageItems: Array<{ link: SiteLink }>;
}

function Pagination({ initialPage, onPageChange, pageItems }: Props) {
  const [selectedPageItem, setSelectedPageItem] = useState<number>(
    initialPage === undefined ? 0 : initialPage - 1,
  );

  useEffect(() => {
    setSelectedPageItem(initialPage === undefined ? 0 : initialPage - 1);
  }, [initialPage]);

  const handleSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    setSelectedPageItem(index);
    onPageChange && onPageChange(event, index + 1);
  };

  return (
    <div css={styles.root}>
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          <div css={styles.header}>
            <p css={styles.pageNumber}>
              {ui('pagination.pageNumber', {
                selectedPageNumber: selectedPageItem + 1,
                pageCount: pageItems.length,
              })}
            </p>
          </div>
        </GridItem>
      </Grid>
      <nav
        css={styles.pagination}
        aria-label="pagination navigation"
        role="navigation"
      >
        <Carousel activeSlide={selectedPageItem} centerActiveSlide>
          {pageItems.map((item, index) => (
            <PageItem
              key={`page-item-${index}`}
              index={index}
              isSelected={selectedPageItem === index}
              item={item}
              onSelect={handleSelect}
            />
          ))}
        </Carousel>
      </nav>
    </div>
  );
}

export default Pagination;
