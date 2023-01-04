import { SessionState, SessionStatus } from './session';

export interface AuthState {
    session: SessionState;
}

export interface AuthModuleState {
    auth: AuthState;
}

export const INITIAL_STATE: AuthModuleState = {
    auth: {
        session: {
            status: SessionStatus.Unauthenticated,
        },
    },
};
