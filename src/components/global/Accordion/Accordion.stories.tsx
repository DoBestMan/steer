import { boolean, number, text } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Accordion from './Accordion';
import { firstItem, mockListOfItems } from './Accordion.mocks';

export default {
  component: Accordion,
  title: 'Global/Accordion',
};

export function AccordionWithKnobs() {
  const optionsGroupId = 'options';
  const singleItemExpandable = boolean(
    'Allow only a single expanded item',
    false,
    optionsGroupId,
  );
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
  const item1Label = text('Title', firstItem.label, firstItemGroupId);
  const item1Value = text('Value', '', firstItemGroupId);
  const item1Content = text(
    'Content',
    firstItem.content || '',
    firstItemGroupId,
  );
  const items = [
    {
      label: item1Label,
      value: item1Value,
      content: item1Content,
      id: firstItem.id,
    },
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
        singleItemExpandable={singleItemExpandable}
      />
    </div>
  );
}

export function AccordionWithChildrenComponents() {
  const items = [
    {
      label: 'First item',
    },
    {
      label: 'Second item',
    },
    {
      label: 'Third item',
    },
    {
      label: 'Fourth item',
    },
  ];

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK, minHeight: '100vh' }}>
      <Accordion items={items}>
        {items.map((item, idx) => (
          <div
            key={idx}
            css={[typography.bodyCopy, { color: COLORS.GLOBAL.WHITE }]}
          >
            <p>{item.label}`s content.</p>
          </div>
        ))}
      </Accordion>
    </div>
  );
}
