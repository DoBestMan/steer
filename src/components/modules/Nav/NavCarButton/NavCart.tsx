import { useCookies } from 'react-cookie';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { navLink } from '~/components/global/Link/Link.styles';
import { COOKIES } from '~/lib/constants/cookies';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';

import { NavThemeObject } from '../Nav.theme';
import styles, { badgeColor } from './NavCart.styles';

const cartLink = {
  href: getLegacyCheckoutURL(),
  icon: ICONS.VEHICLE_CART,
  isExternal: false,
};

function getCartString(quantity: number) {
  let items = ui('nav.cart.multipleItems', { quantity });
  const limit = 9;
  if (quantity === 1) {
    items = ui('nav.cart.oneItem', { quantity });
  }
  if (quantity > limit) {
    items = ui('nav.cart.moreThanLimitItems', { quantity });
  }
  return { items };
}

function getCartNumber(items: number) {
  const limit = 9;
  if (items > limit) {
    return `${limit} +`;
  }
  return `${items}`;
}

function NavCart({ linkTheme }: Pick<NavThemeObject, 'linkTheme'>) {
  const [cookies] = useCookies([COOKIES.CART_QTY]);
  const numberOfCartItems = cookies[COOKIES.CART_QTY];

  if (!numberOfCartItems || numberOfCartItems < 1) {
    return null;
  }

  const label = ui('nav.cart.contentLabel', getCartString(numberOfCartItems));
  const cartNumber = getCartNumber(numberOfCartItems);

  return (
    <Link
      css={[styles.link, navLink[linkTheme].root]}
      {...cartLink}
      theme={linkTheme}
      aria-label={label}
    >
      <span css={[styles.badge, badgeColor[linkTheme]]} aria-hidden="true">
        {cartNumber}
      </span>
    </Link>
  );
}

export default NavCart;
