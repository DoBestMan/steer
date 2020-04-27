import Link, { AnchorProps, ButtonProps } from './Link';
import { navLink } from './Link.styles';

import { LINK_ICON_POSITION, LINK_THEME, LINK_WEIGHT } from '~/lib/constants';

interface Props {
  isActive?: boolean;
}

interface ExtendedButtonProps extends ButtonProps, Props {}

interface ExtendedAnchorProps extends AnchorProps, Props {}

type NavLinkProps = ExtendedButtonProps | ExtendedAnchorProps;

function NavLink({ children, isActive = false, ...rest }: NavLinkProps) {
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
