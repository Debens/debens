import type { Tokens } from '@debens/service-gateway';
import { createAction } from 'redux-actions';

export const LOADING = 'auth/session/loading';
export const loading = createAction(LOADING);

export type IStartPayload = Tokens;

export const START = 'auth/session/start';
export const start = createAction<IStartPayload>(START);

export const STARTED = 'auth/session/started';
export const started = createAction(STARTED);

export const STOPPED = 'auth/session/stopped';
export const stopped = createAction(STOPPED);

export const ERROR = 'auth/session/error';
export const error = createAction(ERROR);
