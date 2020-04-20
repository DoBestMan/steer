import Link, { LinkProps } from './Link';
import { navLink } from './Link.styles';

import { LinkTheme, LinkWeight } from '~/lib/constants';

function NavLink({ children, ...rest }: LinkProps) {
  return (
    <Link
      {...rest}
      weight={LinkWeight.BOLD}
      theme={LinkTheme.LIGHT}
      css={navLink}
    >
      {children}
    </Link>
  );
}

export default NavLink;
