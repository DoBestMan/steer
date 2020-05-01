import { ReactChild } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import CategoryModal from './CategoryModal';

interface Props {
  category: string;
  children: ReactChild;
  selectedCategory: string;
}

function CategoryListWrapper({ category, children, selectedCategory }: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  if (!isMobile) {
    return <span>{children}</span>;
  }

  return (
    <CategoryModal isOpen={selectedCategory === category}>
      {children}
    </CategoryModal>
  );
}

export default CategoryListWrapper;
