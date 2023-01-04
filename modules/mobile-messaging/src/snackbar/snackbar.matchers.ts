import { AnyAction } from 'redux';
import { Action } from 'redux-actions';

import * as actions from './snackbar.actions';

const isHide = (action: AnyAction): action is Action<actions.IHidePayload> => action.type === actions.HIDE;

export const isHidden = (id: string) => (action: AnyAction) => isHide(action) && action.payload === id;
