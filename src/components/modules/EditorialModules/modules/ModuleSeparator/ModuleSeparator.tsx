import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Separator from '~/components/global/Separator/Separator';

function ModuleSeparator(props: { isColumn?: boolean }) {
  return props.isColumn ? (
    <div data-component="module-separator">
      <Separator />
    </div>
  ) : (
    <div data-component="module-separator">
      <Grid>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <Separator />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleSeparator;
