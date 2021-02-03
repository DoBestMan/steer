import GoogleForm from '~/components/global/GoogleForm/GoogleForm';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SiteModuleGoogleForm } from '~/data/models/SiteModules';
function ModuleGoogleForm({ ...props }: SiteModuleGoogleForm) {
  return (
    <div data-component="module-googleform">
      <Grid>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <GoogleForm {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}
export default ModuleGoogleForm;
