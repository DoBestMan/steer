import { useTheme } from 'emotion-theming';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { EXITED, TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { useNavContext } from '~/context/Nav.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';

import { useSearchContext } from '../Search/Search.context';
import { animations, styles } from './Nav.styles';
import { NavThemeObject } from './Nav.theme';
import NavBar from './NavBar';

interface Props {
  isHomepage?: boolean;
}

function Nav({ isHomepage }: Props) {
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

  const [path, setPath] = useState(router?.pathname);

  useEffect(() => {
    if (!router) {
      return;
    }

    setPath(router.pathname);

    // path has changed, the nav can't be hidden!
    setIsHidden(false);
  }, [router, setIsHidden]);

  return (
    <Transition appear in={router && path === router?.pathname} timeout={400}>
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
        );
      }}
    </Transition>
  );
}

export default Nav;
