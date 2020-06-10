import { boolean, number, text } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';

import Accordion from './Accordion';
import { firstItem, mockListOfItems } from './Accordion.mocks';

export default {
  component: Accordion,
  title: 'Global/Accordion',
};

export function AccordionWithKnobs() {
  const optionsGroupId = 'options';
  const itemsToShow = number('Items to show', 4, {}, optionsGroupId);
  const itemsToShowLabel = text(
    'Items to show label',
    'See all {{total}} questions',
    optionsGroupId,
  );
  const defaultItemsToShowLabel = boolean(
    'Apply default items to show label',
    false,
    optionsGroupId,
  );

  const firstItemGroupId = 'first item';
  const item1Title = text('Title', firstItem.title, firstItemGroupId);
  const item1Content = text('Content', firstItem.content, firstItemGroupId);
  const items = [
    { title: item1Title, content: item1Content, id: firstItem.id },
    ...mockListOfItems,
  ];

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK, minHeight: '100vh' }}>
      <Accordion
        items={items}
        itemsToShow={itemsToShow}
        itemsToShowLabel={
          defaultItemsToShowLabel ? undefined : itemsToShowLabel
        }
      />
    </div>
  );
}
