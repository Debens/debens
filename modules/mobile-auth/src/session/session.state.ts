export enum SessionStatus {
    Unauthenticated = 'unauthenticated',
    Loading = 'loading',
    Authenticated = 'authenticated',
}

export interface SessionState {
    status: SessionStatus;
}
