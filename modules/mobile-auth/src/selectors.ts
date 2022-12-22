import { createSelector, Selector } from 'reselect';

import { AuthModuleState, AuthState } from './state';

export const auth: Selector<AuthModuleState, AuthState> = state => state.auth;

export const loading: Selector<AuthModuleState, boolean> = createSelector(auth, auth => auth.loading);
