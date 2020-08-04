import { SiteModuleTireSearchBillboard } from '~/data/models/SiteModuleTireSearchBillboard';

export interface BillboardProps extends SiteModuleTireSearchBillboard {
  onBrandCTAClick: () => void;
  onTireSizeCTAClick: () => void;
  onVehicleCTAClick: () => void;
}
