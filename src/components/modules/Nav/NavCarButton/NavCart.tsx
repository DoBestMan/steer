import { useTheme } from 'emotion-theming';

import Link from '~/components/global/Link/Link';
import { cartLink } from '~/context/Nav.context';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './NavCart.styles';

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

function NavCart() {
  const { linkTheme, textColor } = useTheme();
  // number to be determined via a hook
  const numberOfCartItems = 4;
  const label = ui('nav.cart.contentLabel', getCartString(numberOfCartItems));
  const cartNumber = getCartNumber(numberOfCartItems);

  if (!numberOfCartItems) {
    return null;
  }

  return (
    <Link
      css={[styles.link, textColor]}
      {...cartLink}
      theme={linkTheme}
      aria-label={label}
    >
      <span css={styles.badge} aria-hidden="true">
        {cartNumber}
      </span>
    </Link>
  );
}

export default NavCart;
