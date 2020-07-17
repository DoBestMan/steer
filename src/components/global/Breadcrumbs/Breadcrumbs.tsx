import { BreadcrumbList } from 'schema-dts';

import Carousel from '~/components/global/Carousel/Carousel';
import DataStructure from '~/components/global/DataStructure/DataStructure';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { footerLink } from '~/components/global/Link/Link.styles';
import { useGlobalsContext } from '~/context/Globals.context';
import { THEME } from '~/lib/constants';

import styles, { themeStyles } from './Breadcrumbs.styles';

export interface BreadcrumbsItem {
  currentPath?: boolean;
  label: string;
  url: string;
}

interface Props {
  navigationItems: BreadcrumbsItem[];
  theme?: THEME;
}

function Breadcrumbs({ navigationItems, theme = THEME.LIGHT }: Props) {
  const { hostUrl } = useGlobalsContext();

  const dataStructure: BreadcrumbList | null = hostUrl
    ? {
        '@type': 'BreadcrumbList',
        itemListElement: navigationItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: !item.currentPath ? `${hostUrl}${item.url}` : undefined,
        })),
      }
    : null;

  return (
    <>
      {dataStructure && <DataStructure jsonLD={dataStructure} />}
      <nav aria-label="Breadcrumbs" css={styles.root}>
        <Carousel
          wrapperClass="breadcrumbs-wrapper"
          WrapperEl={'ol' as any} // eslint-disable-line @typescript-eslint/no-explicit-any
          freeScroll
          params={{ initialSlide: navigationItems.length - 1 }}
        >
          {navigationItems.map((item, idx, array) => {
            const isLastItem = idx === array.length - 1;

            return (
              <li key={`${item.label}_${idx}`} css={styles.item}>
                <Link
                  href={item.url}
                  css={[footerLink, themeStyles[theme], styles.link]}
                  theme={theme === THEME.DARK ? THEME.DARK : THEME.LIGHT}
                  aria-current={item.currentPath ? 'page' : undefined}
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
    </>
  );
}

export default Breadcrumbs;
