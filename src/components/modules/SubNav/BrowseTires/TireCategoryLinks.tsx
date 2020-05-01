import GridItem from '~/components/global/Grid/GridItem';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import styles from './BrowseTires.styles';

interface Props {
  onClick: (group: string) => () => void;
  selectedLink: string;
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function TireCategoryLinks({
  siteMenuBrowseList,
  selectedLink,
  onClick,
}: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <GridItem gridColumnM="1/3" gridColumnL="1/4">
      <div css={styles.header}>{isMobile ? 'Browse tires by' : 'Shop by'}</div>
      {siteMenuBrowseList.map(({ title, icon }) => {
        const isSelected = selectedLink === title;
        return (
          <span
            key={title}
            css={[styles.container, isSelected && styles.selected]}
          >
            <div css={!isMobile && isSelected && styles.decoration} />
            <button css={styles.label} onClick={onClick(title)}>
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

export default TireCategoryLinks;
