import { createAction } from 'redux-actions';

import { WithPasskeyChallenge } from '@debens/service-gateway';

export type ILoginPayload = WithPasskeyChallenge;

export const LOGIN = 'onboarding/passkey/login';
export const login = createAction<WithPasskeyChallenge>(LOGIN);

export const LOADING = 'onboarding/passkey/loading';
export const loading = createAction<boolean>(LOADING);

export const ERROR = 'onboarding/passkey/error';
export const error = createAction(ERROR);
