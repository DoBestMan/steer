import Link, { LinkProps } from './Link';
import { navLink } from './Link.styles';

import { LINK_ICON_POSITION, LINK_THEME, LINK_WEIGHT } from '~/lib/constants';

interface Props extends LinkProps {
  isActive?: boolean;
}

function NavLink({ children, isActive = false, ...rest }: Props) {
  return (
    <Link
      {...rest}
      weight={LINK_WEIGHT.BOLD}
      theme={LINK_THEME.LIGHT}
      css={isActive ? navLink.selected : navLink.root}
      iconPosition={LINK_ICON_POSITION.LEFT}
    >
      {children}
    </Link>
  );
}

export default NavLink;
