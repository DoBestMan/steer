import { boolean, number, text } from '@storybook/addon-knobs';

import { COLORS, THEME } from '~/lib/constants';
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
  const isDark = boolean('The dark or light theme?', false);
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
  const item1Label = text('Title', firstItem.label as string, firstItemGroupId);
  const item1Value = text('Value', '', firstItemGroupId);
  const item1Content = text(
    'Content',
    firstItem.content as string,
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
    <div
      css={{
        backgroundColor: isDark ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.WHITE,
        minHeight: '100vh',
      }}
    >
      <Accordion
        id="storybook"
        items={items}
        itemsToShow={itemsToShow}
        itemsToShowLabel={
          defaultItemsToShowLabel ? undefined : itemsToShowLabel
        }
        singleItemExpandable={singleItemExpandable}
        theme={isDark ? THEME.DARK : THEME.LIGHT}
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
      <Accordion id="storybook" items={items}>
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
