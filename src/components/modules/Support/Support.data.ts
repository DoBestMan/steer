import { ROUTE_MAP, ROUTES } from '~/lib/constants';

export const supportData = {
  isBusinessHours: {
    sales: {
      action: '/',
      icon: 'phone',
      text: 'Sales',
    },
    support: {
      action: ROUTE_MAP[ROUTES.CUSTOMER_SUPPORT],
      icon: 'mail',
      text: 'Customer Support',
    },
  },
  isNotBusinessHours: {
    sales: {
      action: '/contact',
      icon: 'phone',
      text: 'Sales',
    },
    support: {
      action: ROUTE_MAP[ROUTES.CUSTOMER_SUPPORT],
      icon: 'mail',
      text: 'Customer Support',
    },
  },
};
