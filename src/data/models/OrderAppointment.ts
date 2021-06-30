import { OrderInstallerAddress } from './OrderInstallerAddress';

export interface OrderAppointment {
  installerAddress: OrderInstallerAddress;
  date: Date;
  startTime: string | null;
  endTime: string | null;
  timeSlot?: string | null;
  note?: string | null;
}
