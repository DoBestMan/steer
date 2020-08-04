import { boolean, text } from '@storybook/addon-knobs';

import TextBasedList from '~/components/global/TextBasedList/TextBasedList';
import {
  firstItem,
  textBasedNavLinks,
} from '~/components/global/TextBasedList/TextBasedList.mocks';
import { TextBasedNavigationListItem } from '~/data/models/TextBasedNavigationProps';

export default {
  component: TextBasedList,
  title: 'Global/Text based list',
};

export function TextBasedListDefault() {
  return <TextBasedList {...textBasedNavLinks} />;
}

export function TextBasedListWithKnobs() {
  const optionsGroupId = 'options';
  const showMoreLink = boolean('Show more link', false, optionsGroupId);
  const firstItemGroupId = 'first item';
  const label = text('Label', firstItem.label, firstItemGroupId);
  const link = text('Link', firstItem.link.href, firstItemGroupId);
  const isExternal = boolean('External link', false, firstItemGroupId);
  const items: Array<TextBasedNavigationListItem> = [
    {
      label,
      link: { href: link, isExternal },
    },
    ...textBasedNavLinks.links,
  ];
  return (
    <TextBasedList
      links={items}
      moreLink={showMoreLink ? textBasedNavLinks.moreLink : undefined}
    />
  );
}
