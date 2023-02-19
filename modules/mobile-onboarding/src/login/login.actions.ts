import { createAction } from 'redux-actions';

export interface IEnterPayload {
    email: string;
}

export const ENTER = 'onboarding/login/enter';
export const enter = createAction<IEnterPayload>(ENTER);

export const LOADING = 'onboarding/login/loading';
export const loading = createAction<boolean>(LOADING);

export const ERROR = 'onboarding/login/error';
export const error = createAction(ERROR);
