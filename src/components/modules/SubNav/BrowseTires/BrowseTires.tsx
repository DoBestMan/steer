import GridItem from '~/components/global/Grid/GridItem';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import Categories from './Categories';
import TireCategoryLinks from './TireCategoryLinks';

interface Props {
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function BrowseTires({ siteMenuBrowseList }: Props) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <>
      {!isMobile && (
        <GridItem gridColumnM="1/3" gridColumnL="1/4">
          <TireCategoryLinks {...{ siteMenuBrowseList }} />
        </GridItem>
      )}
      {siteMenuBrowseList.map(
        ({ info, siteMenuBrowseGroupList, title }, idx: number) => (
          <Categories
            key={idx}
            {...{
              category: title,
              info,
              siteMenuBrowseGroupList,
            }}
          />
        ),
      )}
    </>
  );
}

export default BrowseTires;
