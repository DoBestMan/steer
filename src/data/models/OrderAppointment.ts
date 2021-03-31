import { OrderInstallerAddress } from './OrderInstallerAddress';

export interface OrderAppointment {
  installerAddress: OrderInstallerAddress;
  date: Date;
  startTime: string;
  endTime: string;
  timeSlot?: string | null;
  note?: string | null;
}
