import GridItem from '~/components/global/Grid/GridItem';
import TireCategoryLinks from '~/components/modules/SubNav/BrowseTires/TireCategoryLinks';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';

interface Props {
  onClick: (group: string) => () => void;
  selectedLink: string;
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function SubNavLinks({ siteMenuBrowseList, selectedLink, onClick }: Props) {
  return (
    <GridItem gridColumnM="1/3" gridColumnL="1/4">
      <TireCategoryLinks {...{ onClick, selectedLink, siteMenuBrowseList }} />
      {/* TODO: other nav links */}
    </GridItem>
  );
}

export default SubNavLinks;
