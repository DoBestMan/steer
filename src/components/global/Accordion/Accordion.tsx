import { Children, ReactNode, useCallback, useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import useAccordion from './Accordion.hooks';
import styles from './Accordion.styles';
import AccordionItem from './AccordionItem';

export interface Item {
  content?: string;
  id?: string;
  label: string;
  value?: string;
}

export interface Props {
  children?: ReactNode;
  items: Item[];
  itemsToShow?: number;
  itemsToShowLabel?: string;
  singleItemExpandable?: boolean;
}

const parseShouldShowAll = ({
  items,
  itemsToShow,
}: Pick<Props, 'items' | 'itemsToShow'>) => {
  if (!itemsToShow) {
    return true;
  }

  return items.length <= itemsToShow;
};

function Accordion({
  children,
  items,
  itemsToShow,
  itemsToShowLabel = ui('pdp.faq.showAllDefaultLabel'),
  singleItemExpandable,
}: Props) {
  const [shouldShowAll, setShouldShowAll] = useState(
    parseShouldShowAll({ items, itemsToShow }),
  );
  const showAllLabel = itemsToShowLabel
    ? ui(itemsToShowLabel, {
        total: items.length.toString(),
      })
    : undefined;

  const { expandedItems, itemsRefs, toggleItemHandler } = useAccordion({
    items,
    singleItemExpandable,
  });

  const showAllHandler = useCallback(() => {
    setShouldShowAll(true);
  }, [setShouldShowAll]);

  useEffect(() => {
    setShouldShowAll(parseShouldShowAll({ items, itemsToShow }));
  }, [items, itemsToShow]);

  return (
    <>
      {items
        .slice(0, shouldShowAll ? undefined : itemsToShow)
        .map((item, idx, array) => (
          <div
            key={idx}
            ref={itemsRefs[idx]}
            css={idx < array.length - 1 && styles.itemContainerBorder}
          >
            <AccordionItem
              label={item.label}
              value={item.value}
              id={`accordion-item-${item.id}-${idx}`}
              content={item.content}
              onToggle={toggleItemHandler(idx)}
              isExpanded={expandedItems.includes(idx)}
            >
              {children && Children.toArray(children)[idx]}
            </AccordionItem>
          </div>
        ))}
      {!shouldShowAll && (
        <button onClick={showAllHandler} css={styles.showAll}>
          <span>{showAllLabel}</span>
          <Icon name={ICONS.CHEVRON_DOWN} css={styles.showAllIcon} />
        </button>
      )}
    </>
  );
}

export default Accordion;
