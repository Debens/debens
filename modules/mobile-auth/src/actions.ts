import { createAction } from 'redux-actions';

export interface ILoginPayload {
    email: string;
}

export const LOGIN = 'auth/login';
export const login = createAction<ILoginPayload>(LOGIN);

export interface IRegisterPayload {
    email: string;
}

export const REGISTER = 'auth/register';
export const register = createAction<IRegisterPayload>(REGISTER);

export const LOADING = 'auth/loading';
export const loading = createAction<boolean>(LOADING);
