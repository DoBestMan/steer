import { ActionType, LinkType } from '~/components/modules/Nav/Nav.types';
import { LINK_ICON_POSITION, THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Link, { AnchorProps, ButtonProps } from './Link';
import { navLink } from './Link.styles';

interface Props {
  isActive?: boolean;
  label?: string;
  theme?: THEME.LIGHT | THEME.ORANGE;
}

type NavLinkAnchor = LinkType & AnchorProps;
type NavLinkButton = ActionType & ButtonProps;

function NavLink({
  isActive = false,
  label,
  text,
  theme = THEME.LIGHT,
  ...rest
}: (NavLinkAnchor | NavLinkButton) & Props) {
  const activeStyles = isActive ? navLink[theme].selected : navLink[theme].root;
  if ('href' in rest) {
    return (
      <Link
        theme={theme}
        css={[typography.primarySubhead, activeStyles]}
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
        theme={theme}
        css={[typography.primarySubhead, activeStyles]}
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
