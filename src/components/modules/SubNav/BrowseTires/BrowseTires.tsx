import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';

import Categories from './Categories';

interface Props {
  onClearSelectedLink: () => void;
  selectedLink: string;
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function BrowseTires({
  onClearSelectedLink,
  selectedLink,
  siteMenuBrowseList,
}: Props) {
  return (
    <>
      {siteMenuBrowseList.map(
        ({ info, siteMenuBrowseGroupList, title }, idx: number) => (
          <Categories
            key={idx}
            {...{
              category: title,
              info,
              onClearSelectedLink,
              selectedLink,
              siteMenuBrowseGroupList,
            }}
          />
        ),
      )}
    </>
  );
}

export default BrowseTires;
