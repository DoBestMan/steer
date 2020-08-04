import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Quote from '~/components/global/Quote/Quote';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleQuote } from '~/data/models/SiteModules';

function ModuleQuote(props: SiteModuleQuote) {
  return (
    <div data-component="module-grid-item">
      <Grid css={styles.spacingTop20}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <Quote {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleQuote;
