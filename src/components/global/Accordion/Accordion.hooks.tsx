import { createRef, RefObject, useCallback, useEffect, useState } from 'react';

import { TIME } from '~/lib/constants';

import { Props as InputProps } from './Accordion';

export interface Item {
  content?: string;
  id?: string;
  label: string;
  value?: string;
}

type Props = Pick<InputProps, 'items' | 'singleItemExpandable'>;
const useAccordion = ({ items, singleItemExpandable }: Props) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [itemsRefs, setItemsRefs] = useState<RefObject<HTMLDivElement>[]>([]);

  const scrollToViewItem = useCallback(
    (index: number) => {
      setTimeout(() => {
        const element = itemsRefs[index].current;
        const elementTop = element?.getBoundingClientRect().top;

        if (!element || (elementTop && elementTop >= 0)) {
          return;
        }

        element.scrollIntoView({
          behavior: 'smooth',
        });
      }, TIME.MS400);
    },
    [itemsRefs],
  );

  const toggleItemHandler = useCallback(
    (index: number) => () => {
      const isExpanded = expandedItems.includes(index);

      if (singleItemExpandable) {
        setExpandedItems(isExpanded ? [] : [index]);
        !isExpanded && scrollToViewItem(index);
        return;
      }

      setExpandedItems(
        isExpanded
          ? expandedItems.filter((item) => item !== index)
          : expandedItems.concat([index]),
      );
    },
    [expandedItems, setExpandedItems, singleItemExpandable, scrollToViewItem],
  );

  useEffect(() => {
    if (!items.length) {
      return;
    }

    setItemsRefs(Array.from(Array(items.length)).map(() => createRef()));
  }, [items]);

  return {
    expandedItems,
    itemsRefs,
    toggleItemHandler,
  };
};

export default useAccordion;
