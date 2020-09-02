import { createRef, useEffect } from 'react';

import BaseLink from '~/components/global/Link/BaseLink';
import { SiteLink } from '~/data/models/SiteLink';

import styles from './PageItem.styles';

interface PageItemProps {
  index: number;
  isSelected: boolean;
  item: { link: SiteLink };
  onSelect?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => void;
}

function PageItem({
  item,
  onSelect,
  isSelected,
  index,
  ...rest
}: PageItemProps) {
  const ref = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (!ref || !isSelected) {
      return;
    }

    ref.current?.focus();
  }, [isSelected, ref]);

  const handleSelect = (index: number) => (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (onSelect) {
      onSelect(event, index);
    }
    return;
  };

  return (
    <BaseLink
      href={item.link.href}
      aria-label={`page ${index + 1}`}
      aria-current={isSelected}
      onClick={handleSelect(index)}
      ref={ref}
      css={styles.pageItem}
      {...rest}
    >
      <span
        css={[styles.innerItem, isSelected && styles.selectedItem, !isSelected]}
      >
        {index + 1}
      </span>
    </BaseLink>
  );
}

export default PageItem;
