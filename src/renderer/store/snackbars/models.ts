export enum SnackbarType {
  Success = "Success",
  Danger = "Danger",
}

export type SnackbarKey = string;

export interface SnackbarData {
  key: SnackbarKey;
  message: string;
  type: SnackbarType;
}
export interface SnackbarsState {
  data: Record<SnackbarKey, SnackbarData>;
}
