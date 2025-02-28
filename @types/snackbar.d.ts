export interface Snackbar {
  id: number;
  text: string;
  ms: number;
  bg: string;
}

export type SnackbarMethod = (text: string, ms?: number) => void

export type SnackbarContextType = {
  snackbar: {
    success: SnackbarMethod;
    info: SnackbarMethod;
    error: SnackbarMethod;
  };
}
