import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { SSO_CONSTANTS } from '~/lib/constants/sso';
import { getSSORedirectURL } from '~/lib/utils/sso';
import { ui } from '~/lib/utils/ui-dictionary';

export const accountSectionArray = [
  {
    analytics: 'my_orders_component',
    description: ui('account.accountRedirects.myOrdersDesc'),
    href: ROUTE_MAP[ROUTES.MY_ORDERS],
    icon: ICONS.SHIPPING_TRUCK_OUTLINE,
    isExternal: false,
    title: ui('account.accountRedirects.myOrdersTitle'),
  },
  {
    analytics: 'change_password_component',
    description: ui('account.accountRedirects.changePassDesc'),
    href: getSSORedirectURL(SSO_CONSTANTS.CHANGE_PASSWORD),
    icon: ICONS.REBATE,
    isExternal: true,
    title: ui('account.accountRedirects.changePassTitle'),
  },
  {
    analytics: 'account_details_component',
    description: ui('account.accountRedirects.editAccountDesc'),
    href: getSSORedirectURL(SSO_CONSTANTS.EDIT_PROFILE),
    icon: ICONS.ACCOUNT,
    isExternal: true,
    title: ui('account.accountRedirects.editAccountTitle'),
  },
  {
    analytics: 'my_garage_component',
    description: ui('account.accountRedirects.myGarageDesc'),
    href: ROUTE_MAP[ROUTES.MY_GARAGE],
    icon: ICONS.VEHICLE_CART,
    isExternal: false,
    title: ui('account.accountRedirects.myGarageTitle'),
  },
];

export const noMyCarsAddedDescription = [
  ui('account.myGarageDetails.line1'),
  ui('account.myGarageDetails.line2'),
  ui('account.myGarageDetails.line3'),
];
