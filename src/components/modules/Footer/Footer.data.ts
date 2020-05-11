import { ICONS } from '~/components/global/Icon/Icon.constants';
import { getCurrentYear } from '~/lib/utils/date';

export const data = {
  company: {
    links: [
      { action: '/', text: 'About Us' },
      { action: '/', text: 'Blog' },
      { action: '/', text: 'Join our team' },
      { action: '/', text: 'Contact us' },
      { action: '/', text: 'Privacy policy' },
      { action: '/', text: 'Terms & conditions' },
    ],
  },

  copyright: {
    text: `© ${getCurrentYear()} SimpleTire. All Rights Reserved.`,
  },

  social: {
    links: [
      { action: '/', icon: ICONS.FACEBOOK, text: 'Facebook' },
      { action: '/', icon: ICONS.TWITTER, text: 'Twitter' },
      { action: '/', icon: ICONS.INSTAGRAM, text: 'Instagram' },
      { action: '/', icon: ICONS.YOUTUBE, text: 'YouTube' },
      { action: '/', icon: ICONS.LINKEDIN, text: 'LinkedIn' },
    ],
  },

  tires: {
    links: [
      { action: '/', text: 'Tire Reviews' },
      { action: '/', text: 'Tire buying guide' },
      { action: '/', text: 'Track your order' },
      { action: '/', text: 'FAQs' },
      { action: '/', text: 'Return / refund policy' },
      { action: '/', text: 'Financing' },
    ],
  },
};
