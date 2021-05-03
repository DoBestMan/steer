import { useState } from 'react';

import DataTableVertical from '~/components/global/DataTables/DataTableVertical';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleTabbedTable } from '~/data/models/SiteModules';

function ModuleTabbedTable(props: SiteModuleTabbedTable) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div data-component="module-tabbed-data-table">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <div css={styles.tabsContainer}>
            {props.tabs &&
              props.tabs.map((tab, id) => (
                <span
                  key={'tab-' + id}
                  css={[styles.tab, id === activeTab ? styles.tabActive : null]}
                  onClick={() => setActiveTab(id)}
                >
                  {tab}
                </span>
              ))}
          </div>
          <DataTableVertical {...props.tables[activeTab]} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleTabbedTable;
