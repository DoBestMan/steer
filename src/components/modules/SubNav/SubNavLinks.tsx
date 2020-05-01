import GridItem from '~/components/global/Grid/GridItem';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import styles from './SubNav.styles';

interface Props {
  onClick: (group: string) => void;
  selectedCategory: string;
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function handleClick(group: string, onClick: Props['onClick']) {
  return () => onClick(group);
}

function SubNavLinks({ onClick, selectedCategory, siteMenuBrowseList }: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <GridItem gridColumnM="2/4" gridColumnXL="8/11">
      <div css={[typography.eyebrow, styles.subnavLabel]}>
        {isMobile ? 'Browse tires by' : 'Shop by'}
      </div>
      {siteMenuBrowseList.map(({ title, icon }) => {
        const isSelected = selectedCategory === title;
        return (
          <span
            key={title}
            css={[styles.linkContainer, isSelected && styles.selected]}
          >
            <div css={!isMobile && isSelected && styles.linkDecoration} />
            <button
              css={[typography.primaryHeadline, styles.title]}
              onClick={handleClick(title, onClick)}
            >
              {title}
              {icon && (
                <IconOrImage
                  css={[styles.flair, isSelected && styles.selected]}
                  {...icon}
                />
              )}
            </button>
          </span>
        );
      })}
    </GridItem>
  );
}

export default SubNavLinks;
