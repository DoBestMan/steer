import { useTheme } from 'emotion-theming';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { EXITED, TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { useNavContext } from '~/context/Nav.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { layout } from '~/styles/layout.styles';

import { useSearchContext } from '../Search/Search.context';
import { animations, styles } from './Nav.styles';
import { NavThemeObject } from './Nav.theme';
import NavBar from './NavBar';

export const NAV_ID = 'main-navigation';

interface Props {
  isHomepage?: boolean;
  isLoading?: boolean;
}

function Nav({ isHomepage, isLoading }: Props) {
  const {
    links,
    isHidden,
    setIsHidden,
    toggleSubNav,
    createSelectLinkHandler,
  } = useNavContext();
  const { toggleIsSearchOpen } = useSearchContext();
  const theme: NavThemeObject = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      return;
    }

    // path has changed, the nav can't be hidden!
    setIsHidden(false);
  }, [router, setIsHidden]);

  return (
    <Transition appear in={!isLoading} timeout={400}>
      {(containerTransitionState: TransitionStatus) => {
        // We force the nav to stay hidden
        if (isHidden) {
          containerTransitionState = EXITED;
        }

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
                // TODO number to be determined via cookies
                // numberOfCartItems={4}
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
