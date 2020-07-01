import GridItem from '~/components/global/Grid/GridItem';
import { SiteMenu } from '~/data/models/SiteMenu';

import styles from './BrowseTires.styles';
import Categories from './Categories';
import TireCategoryLinks from './TireCategoryLinks';

interface Props extends Pick<SiteMenu, 'siteMenuBrowseList'> {
  isMobile: boolean;
  isOpen: boolean;
  shouldSetFocus: boolean;
}

function BrowseTires({
  isOpen,
  isMobile,
  shouldSetFocus,
  siteMenuBrowseList,
}: Props) {
  return (
    <>
      <GridItem
        gridColumnM="1/4"
        css={[styles.smallHide, !isOpen && styles.hide]}
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
              shouldSetFocus,
              siteMenuBrowseGroupList,
            }}
          />
        ),
      )}
    </>
  );
}

export default BrowseTires;
