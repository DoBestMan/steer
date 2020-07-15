const PREFIX = 'ST_';

export enum PROPERTIES {
  SESSION = 'SESSION',
  VEHICLE_METADATA = 'VEHICLE_METADATA',
}

export const LOCAL_STORAGE: Record<PROPERTIES, string> = {
  [PROPERTIES.SESSION]: PREFIX + 'SESSION',
  [PROPERTIES.VEHICLE_METADATA]: PREFIX + 'VEHICLE_METADATA',
};