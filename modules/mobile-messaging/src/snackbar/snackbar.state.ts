export enum SnackbarType {
    Success = 'success',
    Error = 'error',
}

export interface Snackbar {
    id: string;
    message: string;
    type: `${SnackbarType}`;
}

export interface SnackbarState {
    snackbars: Snackbar[];
}
