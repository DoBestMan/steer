import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import Installation from '~/components/modules/PDP/Installation/Installation';
import { useModalContext } from '~/context/Modal.context';
import { SiteModulePDPInstallation } from '~/data/models/SiteModules';

function ModulePDPInstallation({ ...props }: SiteModulePDPInstallation) {
  const { openStaticModal } = useModalContext();

  return (
    <div data-component="module-installation">
      <Grid css={[styles.spacingTopS60XL80, styles.spacingTopS60XL80]}>
        <GridItem fullbleed>
          <Installation {...props} openStaticModal={openStaticModal} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModulePDPInstallation;
