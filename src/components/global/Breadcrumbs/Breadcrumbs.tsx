import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { footerLink } from '~/components/global/Link/Link.styles';
import { THEME } from '~/lib/constants';

import styles, { themeStyles } from './Breadcrumbs.styles';

export interface BreadcrumbsItem {
  label: string;
  url: string;
}

interface Props {
  currentPath?: string;
  navigationItems: BreadcrumbsItem[];
  theme?: THEME;
}

function Breadcrumbs({
  navigationItems,
  currentPath,
  theme = THEME.LIGHT,
}: Props) {
  return (
    <nav aria-label="Breadcrumbs" css={styles.root}>
      <Carousel
        wrapperClass="breadcrumbs-wrapper"
        WrapperEl={'ol' as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        freeScroll
        params={{ initialSlide: navigationItems.length - 1 }}
      >
        {navigationItems.map((item, idx, array) => {
          const isLastItem = idx === array.length - 1;
          const isCurrentPath = currentPath === item.url;

          return (
            <li key={`${item.label}_${idx}`} css={styles.item}>
              <Link
                href={item.url}
                css={[footerLink, themeStyles[theme]]}
                theme={theme === THEME.DARK ? THEME.DARK : THEME.LIGHT}
                aria-current={isCurrentPath ? 'page' : undefined}
              >
                {item.label}
              </Link>
              {!isLastItem && (
                <span aria-hidden>
                  <Icon
                    name={ICONS.CHEVRON_RIGHT}
                    css={[styles.nextItemIcon, themeStyles[theme]]}
                  />
                </span>
              )}
            </li>
          );
        })}
      </Carousel>
    </nav>
  );
}

export default Breadcrumbs;
