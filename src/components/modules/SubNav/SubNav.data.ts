import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';

export const siteMenuLearnData: SiteMenuLearn = {
  list: [
    {
      label: 'How SimpleTire works',
      link: { href: '/how-we-work', isExternal: false },
    },
    {
      label: 'Tire maintenance',
      link: { href: '/tire-maintenance', isExternal: false },
    },
    {
      label: 'Tire size calculator',
      link: { href: '/tire-size-calculator', isExternal: false },
    },
    { label: 'FAQs', link: { href: '/faq', isExternal: false } },
  ],
};
