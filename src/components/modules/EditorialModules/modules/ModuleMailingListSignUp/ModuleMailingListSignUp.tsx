import React from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import FooterMailingList from '~/components/modules/Footer/FooterMailingList/FooterMailingList';
import { SiteModuleMailingListSignUp } from '~/data/models/SiteModules';

function ModuleMailingListSignUp(props: SiteModuleMailingListSignUp) {
  return (
    <div data-component="module-markdown">
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'3/13'}
          gridColumnXL={'5/11'}
        >
          <FooterMailingList {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleMailingListSignUp;
