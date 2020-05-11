import { ActionType, LinkType } from '~/components/modules/Nav/Nav.constants';
import { LINK_ICON_POSITION, LINK_THEME, LINK_WEIGHT } from '~/lib/constants';

import Link, { AnchorProps, ButtonProps } from './Link';
import { navLink } from './Link.styles';

interface Props {
  isActive?: boolean;
  label?: string;
}

type NavLinkAnchor = LinkType & AnchorProps;
type NavLinkButton = ActionType & ButtonProps;

function NavLink({
  isActive = false,
  label,
  text,
  ...rest
}: (NavLinkAnchor | NavLinkButton) & Props) {
  if ('href' in rest) {
    return (
      <Link
        weight={LINK_WEIGHT.BOLD}
        theme={LINK_THEME.LIGHT}
        css={isActive ? navLink.selected : navLink.root}
        iconPosition={LINK_ICON_POSITION.LEFT}
        aria-label={label || text}
        {...rest}
      >
        {text}
      </Link>
    );
  }
  if ('target' in rest) {
    return (
      <Link
        as="button"
        weight={LINK_WEIGHT.BOLD}
        theme={LINK_THEME.LIGHT}
        css={isActive ? navLink.selected : navLink.root}
        iconPosition={LINK_ICON_POSITION.LEFT}
        aria-label={label || text}
        {...rest}
      >
        {text}
      </Link>
    );
  }

  return null;
}

export default NavLink;
