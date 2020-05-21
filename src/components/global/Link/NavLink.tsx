import { ActionType, LinkType } from '~/components/modules/Nav/Nav.types';
import { LINK_ICON_POSITION, LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

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
        theme={LINK_THEME.LIGHT}
        css={[
          typography.primarySubhead,
          isActive ? navLink.selected : navLink.root,
        ]}
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
        theme={LINK_THEME.LIGHT}
        css={[
          typography.primarySubhead,
          isActive ? navLink.selected : navLink.root,
        ]}
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
