export interface AuthState {
    loading: boolean;
}

export interface AuthModuleState {
    auth: AuthState;
}

export const INITIAL_STATE: AuthModuleState = {
    auth: {
        loading: false,
    },
};
