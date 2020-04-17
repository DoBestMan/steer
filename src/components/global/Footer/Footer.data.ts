import { ICONS } from '~/components/global/Icon/Icon.constants';
import { getCurrentYear } from '~/utils/date';

export const data = {
  company: {
    heading: 'Company',
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

  isBusinessHours: {
    heading: 'Need live support?',
    sales: {
      action: '/',
      icon: 'phone',
      text: 'Sales (888) 410 0604',
    },
    support: {
      action: '/',
      icon: 'mail',
      text: 'Customer Support',
    },
  },

  isNotBusinessHours: {
    heading: 'Need support?',
    sales: {
      action: '/',
      icon: 'phone',
      text: 'Sales',
    },
    support: {
      action: '/',
      icon: 'mail',
      text: 'Customer Support',
    },
  },

  logo: {
    altText: 'Simple Tire',
  },

  social: {
    heading: 'Social',
    links: [
      { action: '/', icon: ICONS.FACEBOOK, text: 'Facebook' },
      { action: '/', icon: ICONS.TWITTER, text: 'Twitter' },
      { action: '/', icon: ICONS.INSTAGRAM, text: 'Instagram' },
      { action: '/', icon: ICONS.YOUTUBE, text: 'YouTube' },
      { action: '/', icon: ICONS.LINKEDIN, text: 'LinkedIn' },
    ],
  },

  tires: {
    heading: 'Tires 101',
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
