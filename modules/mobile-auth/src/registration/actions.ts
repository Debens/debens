import { createAction } from 'redux-actions';

export interface IRegisterPayload {
    email: string;
}

export const REGISTER = 'auth/register';
export const register = createAction<IRegisterPayload>(REGISTER);
