export interface Snackbar {
  message: string;
  type: 'error' | 'success';
  duration: number;
}

export enum DeviceType {
  Mobile,
  Desktop
}
