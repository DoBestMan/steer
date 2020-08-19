import { boolean, text } from '@storybook/addon-knobs';

import TextBasedList from '~/components/global/TextBasedList/TextBasedList';
import {
  firstItemMock,
  textBasedNavLinksMock,
} from '~/components/global/TextBasedList/TextBasedList.mock';
import { TextBasedNavigationListItem } from '~/data/models/TextBasedNavigationProps';

export default {
  component: TextBasedList,
  title: 'Global/Text based list',
};

export function TextBasedListDefault() {
  return <TextBasedList {...textBasedNavLinksMock} />;
}

export function TextBasedListWithKnobs() {
  const optionsGroupId = 'options';
  const showMoreLink = boolean('Show more link', false, optionsGroupId);
  const firstItemGroupId = 'first item';
  const label = text('Label', firstItemMock.label, firstItemGroupId);
  const link = text('Link', firstItemMock.link.href, firstItemGroupId);
  const isExternal = boolean('External link', false, firstItemGroupId);
  const items: Array<TextBasedNavigationListItem> = [
    {
      label,
      link: { href: link, isExternal },
    },
    ...textBasedNavLinksMock.links,
  ];
  return (
    <TextBasedList
      links={items}
      moreLink={showMoreLink ? textBasedNavLinksMock.moreLink : undefined}
    />
  );
}
