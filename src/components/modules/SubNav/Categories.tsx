import GridItem from '~/components/global/Grid/GridItem';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Link from '~/components/global/Link/Link';
import { SiteMenuBrowseGroupItem } from '~/data/models/SiteMenuBrowseGroupItem';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import CategoryInfo from './CategoryInfo';
import CategoryListWrapper from './CategoryListWrapper';
import Flair from './Flair';
import styles from './SubNav.styles';

interface Props {
  category: string;
  info: SiteMenuBrowseItem['info'];
  selectedCategory: string;
  siteMenuBrowseGroupList: SiteMenuBrowseGroupItem[];
}

function Categories({
  category,
  info,
  selectedCategory,
  siteMenuBrowseGroupList,
}: Props) {
  if (selectedCategory !== category) {
    return null;
  }
  return (
    <GridItem gridColumnM="4/8" gridColumnXL="11/14">
      <CategoryListWrapper
        category={category}
        selectedCategory={selectedCategory}
      >
        <>
          {siteMenuBrowseGroupList.map(
            ({ header, items, more }, idx: number) => (
              <div css={styles.list} key={idx}>
                {header && (
                  <div css={[typography.eyebrow, styles.header]}>
                    {header.title}
                    {header.icon && (
                      <span css={styles.image}>
                        <IconOrImage {...header.icon} />
                      </span>
                    )}
                  </div>
                )}
                <ul>
                  {items.map((item) => (
                    <li key={item.label} css={styles.listItem}>
                      <div css={styles.label}>
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
                </ul>
                {more && (
                  <div css={styles.more}>
                    <Link
                      theme={LINK_THEME.LIGHT}
                      href={more.link.href}
                      css={styles.link}
                    >
                      {more.label}
                    </Link>
                  </div>
                )}
              </div>
            ),
          )}
          {info && <CategoryInfo {...info} />}
        </>
      </CategoryListWrapper>
    </GridItem>
  );
}

export default Categories;
