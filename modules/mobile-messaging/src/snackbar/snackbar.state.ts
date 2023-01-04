export enum SnackbarType {
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
