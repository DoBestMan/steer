import GridItem from '~/components/global/Grid/GridItem';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Link from '~/components/global/Link/Link';
import { useNavState } from '~/components/global/Nav/Nav.container';
import SubNavContentWrapper from '~/components/modules/SubNav/SubNavContentWrapper';
import { SiteMenuBrowseGroupItem } from '~/data/models/SiteMenuBrowseGroupItem';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import styles from './BrowseTires.styles';
import CategoryInfo from './CategoryInfo';
import Flair from './Flair';

interface Props {
  category: string;
  info: SiteMenuBrowseItem['info'];
  siteMenuBrowseGroupList: SiteMenuBrowseGroupItem[];
}

function Categories({ category, info, siteMenuBrowseGroupList }: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  const {
    activeCategory,
    handleClearCategory,
    handleCloseSubNav,
  } = useNavState();
  if (activeCategory !== category) {
    return null;
  }
  return (
    <GridItem gridColumnM="3/7" gridColumnL="4/8">
      <SubNavContentWrapper
        category={category}
        isOpen={activeCategory === category}
        onClose={handleCloseSubNav}
        onBack={handleClearCategory}
      >
        <div css={styles.content}>
          {isMobile && (
            <h1 css={[typography.jumboHeadline, styles.mobileHeader]}>
              {category}
            </h1>
          )}
          {siteMenuBrowseGroupList.map(
            ({ header, items, more }, idx: number) => (
              <div css={styles.categoryList} key={idx}>
                {header && (
                  <div css={[typography.eyebrow, styles.listTitle]}>
                    {header.title}
                    {header.icon && (
                      <span css={styles.image}>
                        <IconOrImage {...header.icon} />
                      </span>
                    )}
                  </div>
                )}
                <ul css={[styles.list, !header && styles.alignList]}>
                  {items.map((item) => (
                    <li key={item.label} css={styles.listItem}>
                      <div css={styles.linkLabel}>
                        <Link
                          theme={LINK_THEME.LIGHT}
                          href={item.link.href}
                          css={styles.link}
                        >
                          {item.label}
                        </Link>
                        {item.flair && (
                          <Flair {...item.flair} css={styles.selected} />
                        )}
                      </div>
                      <div css={styles.imageContainer}>
                        {item.icon && (
                          <span css={styles.image}>
                            <IconOrImage {...item.icon} />
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                  {more && (
                    <li css={styles.listItem}>
                      <Link
                        theme={LINK_THEME.LIGHT}
                        href={more.link.href}
                        css={styles.link}
                      >
                        {more.label}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ),
          )}
          {info && <CategoryInfo {...info} />}
        </div>
      </SubNavContentWrapper>
    </GridItem>
  );
}

export default Categories;
