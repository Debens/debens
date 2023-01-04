import { SnackbarState } from './snackbar';

export interface MessagingState {
    snackbar: SnackbarState;
}

export interface MessagingModuleState {
    messaging: MessagingState;
}

export const INITIAL_STATE: MessagingModuleState = {
    messaging: {
        snackbar: {
            snackbars: [],
        },
    },
};
