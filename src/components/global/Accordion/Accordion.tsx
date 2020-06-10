import { useCallback, useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Accordion.styles';
import AccordionItem from './AccordionItem';

export interface Item {
  content: string;
  id: string;
  title: string;
}

interface Props {
  items: Item[];
  itemsToShow: number;
  itemsToShowLabel?: string;
}

function shouldShowAll({
  items,
  itemsToShow,
}: Pick<Props, 'items' | 'itemsToShow'>) {
  return items.length <= itemsToShow;
}

function Accordion({
  items,
  itemsToShow,
  itemsToShowLabel = ui('pdp.faq.showAllDefaultLabel'),
}: Props) {
  const [showAll, setShowAll] = useState(shouldShowAll({ items, itemsToShow }));
  const showAllLabel = ui(itemsToShowLabel, {
    total: items.length.toString(),
  });

  const onShowAll = useCallback(() => {
    setShowAll(true);
  }, [setShowAll]);

  useEffect(() => {
    setShowAll(shouldShowAll({ items, itemsToShow }));
  }, [items, itemsToShow]);

  return (
    <>
      {items.slice(0, showAll ? undefined : itemsToShow).map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          id={item.id}
          content={item.content}
        />
      ))}
      {!showAll && (
        <button onClick={onShowAll} css={styles.showAll}>
          <span>{showAllLabel}</span>
          <Icon name={ICONS.CHEVRON_DOWN} css={styles.showAllIcon} />
        </button>
      )}
    </>
  );
}

export default Accordion;
