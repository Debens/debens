import { createAction } from 'redux-actions';

import type { WithPasscodeChallenge } from '@debens/service-gateway';

export type ILoginPayload = WithPasscodeChallenge;

export const LOGIN = 'onboarding/passcode/login';
export const login = createAction<WithPasscodeChallenge>(LOGIN);

export interface ICompletePayload {
    user: string;
    challenge: string;
    code: string;
}

export const COMPLETE = 'onboarding/passcode/complete';
export const complete = createAction<ICompletePayload>(COMPLETE);

export const LOADING = 'onboarding/passcode/loading';
export const loading = createAction<boolean>(LOADING);

export const ERROR = 'onboarding/passcode/error';
export const error = createAction(ERROR);
