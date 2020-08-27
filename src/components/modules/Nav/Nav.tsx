import { useTheme } from 'emotion-theming';
import { useCookies } from 'react-cookie';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { useNavContext } from '~/context/Nav.context';
import { TIME } from '~/lib/constants';
import { COOKIES } from '~/lib/constants/cookies';
import { ui } from '~/lib/utils/ui-dictionary';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { layout } from '~/styles/layout.styles';

import { useSearchModalContext } from '../Search/SearchModal.context';
import { animations, styles } from './Nav.styles';
import { NavThemeObject } from './Nav.theme';
import NavBar from './NavBar';

export const NAV_ID = 'main-navigation';

interface Props {
  isHomepage?: boolean;
}

function Nav({ isHomepage }: Props) {
  const {
    links,
    isVisible,
    toggleSubNav,
    createSelectLinkHandler,
  } = useNavContext();
  const { toggleIsSearchOpen } = useSearchModalContext();
  const theme: NavThemeObject = useTheme();

  const [cookies] = useCookies([COOKIES.CART_QTY]);
  const cartQty = cookies[COOKIES.CART_QTY];

  return (
    <Transition appear={false} in={isVisible} timeout={TIME.MS400}>
      {(containerTransitionState: TransitionStatus) => {
        const rootStyles = [
          styles.root,
          theme.textColor,
          animations[`root_${containerTransitionState}`],
        ];

        return (
          <div id={NAV_ID} tabIndex={0} css={disableGlobalFocus}>
            <Grid as="nav" css={rootStyles}>
              <GridItem
                css={[layout.container, styles.container]}
                gridColumn="2/4"
              >
                <BaseLink
                  href="/"
                  css={[layout.container, layout.centeredVertical]}
                >
                  <Image
                    altText={ui('logo.alt')}
                    css={styles.logo}
                    src={theme.logoUrl}
                  />
                </BaseLink>
              </GridItem>
              <NavBar
                handleOnNavLinkClick={createSelectLinkHandler}
                handleOnSearchClick={toggleIsSearchOpen}
                handleOnSubNavClick={toggleSubNav}
                isHomepage={isHomepage}
                links={links}
                numberOfCartItems={cartQty}
                theme={theme}
              />
            </Grid>
          </div>
        );
      }}
    </Transition>
  );
}

export default Nav;
