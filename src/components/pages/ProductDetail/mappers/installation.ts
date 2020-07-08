import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductInstallationStatusEnum } from '~/data/models/SiteProductInstallation';

export function mapDataToInstallation({
  siteProduct: { siteProductInstallation },
}: {
  siteProduct: SiteProduct;
}): InstallationProps | null {
  const isAvailable =
    siteProductInstallation?.status ===
    SiteProductInstallationStatusEnum.SiteProductInstallationAvailable;

  if (!isAvailable || !siteProductInstallation) {
    return null;
  }

  return siteProductInstallation.installationMeta;
}
