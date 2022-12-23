import { createAction } from 'redux-actions';

export interface ILoginPayload {
    email: string;
}

export const LOGIN = 'auth/login';
export const login = createAction<ILoginPayload>(LOGIN);
