export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  lastOrderDate: null;
  orderCount: number;
  created: Date;
  deleted: boolean | null;
  active: boolean;
  ssoUid: string;
}
