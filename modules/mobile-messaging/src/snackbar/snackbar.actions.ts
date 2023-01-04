import { createAction } from 'redux-actions';

import * as uuid from 'uuid';

import { Snackbar } from './snackbar.state';

export type IShowPayload = Snackbar;

export const SHOW = 'snackbar/show';
export const show = createAction<IShowPayload, Omit<Snackbar, 'id'>>(SHOW, payload => ({
    ...payload,
    id: uuid.v4(),
}));

export type IHidePayload = string;

export const HIDE = 'snackbar/hide';
export const hide = createAction<string>(HIDE);
