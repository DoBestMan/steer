import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Quote from '~/components/global/Quote/Quote';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleQuote } from '~/data/models/SiteModules';

function ModuleQuote(props: SiteModuleQuote) {
  return props.isColumn ? (
    <div data-component="module-grid-item">
      <Quote {...props} />
    </div>
  ) : (
    <div data-component="module-grid-item">
      <Grid css={styles.spacingTop20}>
        <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
          <Quote {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleQuote;
