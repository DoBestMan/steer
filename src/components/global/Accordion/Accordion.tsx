import { Children, ReactNode, useCallback, useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import useAccordion from './Accordion.hooks';
import styles from './Accordion.styles';
import AccordionItem from './AccordionItem';

export interface Item {
  content?: string | string[] | null;
  id?: string | string[] | null;
  label: string | string[] | null;
  value?: string | string[] | null;
}

export interface Props {
  children?: ReactNode;
  id: string; // To prevent duplicated ids (a11y)
  items: Item[];
  itemsToShow?: number;
  itemsToShowLabel?: string;
  linkTarget?: string;
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
  id,
  items,
  itemsToShow,
  itemsToShowLabel = ui('pdp.accordion.showAllDefaultLabel'),
  singleItemExpandable,
  linkTarget = '_blank',
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
    <div>
      {items
        .slice(0, shouldShowAll ? undefined : itemsToShow)
        .map((item, idx) => {
          const isExpanded = expandedItems.includes(idx);

          return (
            <div
              key={idx}
              ref={itemsRefs[idx]}
              css={[
                styles.itemContainer,
                isExpanded && styles.itemContainerActive,
              ]}
            >
              <AccordionItem
                label={item.label?.toString() || ''}
                value={item.value?.toString() || ''}
                id={`${id}-${idx}`}
                content={item.content?.toString() || ''}
                onToggle={toggleItemHandler(idx)}
                isExpanded={isExpanded}
                linkTarget={linkTarget}
              >
                {children && Children.toArray(children)[idx]}
              </AccordionItem>
            </div>
          );
        })}
      {!shouldShowAll && (
        <button onClick={showAllHandler} css={styles.showAll}>
          <span>{showAllLabel}</span>
          <Icon name={ICONS.CHEVRON_DOWN} css={styles.showAllIcon} />
        </button>
      )}
    </div>
  );
}

export default Accordion;
