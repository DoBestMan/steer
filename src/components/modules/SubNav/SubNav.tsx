import { useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';

import Categories from './Categories';
import styles from './SubNav.styles';
import SubNavLinks from './SubNavLinks';

interface Props {
  siteMenuBrowseList: SiteMenuBrowseItem[];
  siteMenuLearn: SiteMenuLearn;
}

function SubNav({ siteMenuBrowseList }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  return (
    <Grid css={styles.root}>
      <SubNavLinks
        {...{
          onClick: setSelectedCategory,
          selectedCategory,
          siteMenuBrowseList,
        }}
      />
      {siteMenuBrowseList.map(
        ({ info, siteMenuBrowseGroupList, title }, idx: number) => (
          <Categories
            key={idx}
            {...{
              category: title,
              info,
              selectedCategory,
              siteMenuBrowseGroupList,
            }}
          />
        ),
      )}
    </Grid>
  );
}

export default SubNav;
