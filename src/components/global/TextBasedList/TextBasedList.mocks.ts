import {
  TextBasedNavigationListItem,
  TextBasedNavigationProps,
} from '~/data/models/TextBasedNavigationProps';

export const firstItem: TextBasedNavigationListItem = {
  label: 'Dynamic label',
  link: { href: 'topic/dynamic-link', isExternal: false },
};
export const textBasedNavLinks: TextBasedNavigationProps = {
  links: [
    {
      label: 'First topic in this list',
      link: { href: '/topic/first', isExternal: false },
    },
    {
      label: 'Second topic',
      link: { href: '/topic/first', isExternal: false },
    },
    {
      label: 'Third topic',
      link: { href: '/topic/first', isExternal: false },
    },
  ],
  moreLink: {
    label: 'More topics',
    link: { href: '/topic/more', isExternal: false },
  },
};
