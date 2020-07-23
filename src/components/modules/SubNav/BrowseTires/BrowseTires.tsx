import GridItem from '~/components/global/Grid/GridItem';
import { SiteMenu } from '~/data/models/SiteMenu';

import styles from './BrowseTires.styles';
import Categories from './Categories';
import TireCategoryLinks from './TireCategoryLinks';

interface Props extends Pick<SiteMenu, 'siteMenuBrowseList'> {
  isMobile: boolean;
  isOpen: boolean;
}

function BrowseTires({ isOpen, isMobile, siteMenuBrowseList }: Props) {
  return (
    <>
      <GridItem
        gridColumnM="1/4"
        css={[styles.smallHide, !isOpen && styles.hide, styles.mainLinks]}
      >
        <TireCategoryLinks {...{ siteMenuBrowseList }} />
      </GridItem>
      {siteMenuBrowseList.map(
        ({ info, siteMenuBrowseGroupList, title }, idx: number) => (
          <Categories
            key={idx}
            {...{
              category: title,
              info,
              isMobile,
              isOpen,
              siteMenuBrowseGroupList,
            }}
          />
        ),
      )}
    </>
  );
}

export default BrowseTires;
