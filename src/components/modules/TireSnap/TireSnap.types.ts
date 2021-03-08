export type FacingMode = 'user' | 'environment';
export type Stream = MediaStream | null;
export type SetStream = React.Dispatch<React.SetStateAction<Stream>>;
export type SetNumberOfCameras = React.Dispatch<React.SetStateAction<number>>;
export type SetNotSupported = React.Dispatch<React.SetStateAction<boolean>>;
export type SetPermissionDenied = React.Dispatch<React.SetStateAction<boolean>>;
export interface CameraProps {
  facingMode?: FacingMode;
  onImageTaken: (image: string | undefined) => void;
  onPermissionDenied: () => void;
  showUI?: boolean;
}

export type CameraType = React.ForwardRefExoticComponent<
  CameraProps & React.RefAttributes<unknown>
> & {
  getNumberOfCameras(): number;
  switchCamera(): FacingMode;
  takePhoto(): string;
};
