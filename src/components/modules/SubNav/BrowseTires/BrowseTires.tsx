import GridItem from '~/components/global/Grid/GridItem';
import { SiteMenu } from '~/data/models/SiteMenu';

import styles from './BrowseTires.styles';
import Categories from './Categories';
import TireCategoryLinks from './TireCategoryLinks';

interface Props extends Pick<SiteMenu, 'siteMenuBrowseList'> {
  isMobile: boolean;
  shouldSetFocus: boolean;
}

function BrowseTires({ isMobile, shouldSetFocus, siteMenuBrowseList }: Props) {
  return (
    <>
      <GridItem gridColumnM="1/3" gridColumnL="1/4" css={styles.smallHide}>
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
