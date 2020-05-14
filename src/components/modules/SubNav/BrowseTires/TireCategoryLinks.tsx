import GridItem from '~/components/global/Grid/GridItem';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './BrowseTires.styles';

function TireCategoryLinks({
  siteMenuBrowseList,
}: Pick<SiteMenu, 'siteMenuBrowseList'>) {
  const { activeCategory, createSelectCategoryHandler } = useNavContext();
  const { isMobile } = useBreakpoints();
  return (
    <GridItem gridColumnM="1/3" gridColumnL="1/4">
      <div css={styles.header}>
        {isMobile
          ? ui('nav.browseTires.mobileHeader')
          : ui('nav.browseTires.header')}
      </div>
      {siteMenuBrowseList.map(({ title, icon }) => {
        const isSelected = activeCategory === title;
        return (
          <span
            key={title}
            css={[styles.container, isSelected && styles.selected]}
          >
            <div css={isSelected && styles.decoration} />
            <button
              aria-label={title}
              aria-current={isSelected}
              css={styles.label}
              onClick={createSelectCategoryHandler(title)}
            >
              {title}
              {icon && <IconOrImage css={styles.flair} {...icon} />}
            </button>
          </span>
        );
      })}
    </GridItem>
  );
}

export default TireCategoryLinks;
