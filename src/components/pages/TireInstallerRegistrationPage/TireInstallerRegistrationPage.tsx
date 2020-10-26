import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Separator from '~/components/global/Separator/Separator';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import TireInstallerRegistrationForm from '~/components/pages/TireInstallerRegistrationPage/TireInstallerRegistrationForm/TireInstallerRegistrationForm';
import { ui } from '~/lib/utils/ui-dictionary';

import { mapQueryToBreadcrumbs } from './mapper/breadcrumbs';
import { headerData } from './TireInstallerRegistrationPage.constants';
import { styles } from './TireInstallerRegistrationPage.styles';

function TireInstallerRegistrationPage() {
  const router = useRouter();
  const { query } = router;

  return (
    <div css={navigationBreadcrumbPaddingTop}>
      <Grid>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <div css={styles.spacingBottom40}>
            <Breadcrumbs
              navigationItems={mapQueryToBreadcrumbs(
                query,
                ui('breadcrumbs.tireInstallerRegistration'),
              )}
            />
          </div>
          <HeaderLandingPage {...headerData} />
          <Separator />
          <TireInstallerRegistrationForm />
        </GridItem>
      </Grid>
    </div>
  );
}

export default TireInstallerRegistrationPage;
