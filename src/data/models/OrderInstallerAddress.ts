export interface OrderInstallerAddress {
  company: string;
  city: string;
  addressLine1: string;
  addressLine2?: string | null;
  state: string;
  zip: string;
}
