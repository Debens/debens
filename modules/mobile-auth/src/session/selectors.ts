import { createSelector, Selector } from 'reselect';

import { AuthModuleState } from '../state';

import { SessionState, SessionStatus } from './state';

export const session: Selector<AuthModuleState, SessionState> = state => state.auth.session;

export const status = createSelector(session, session => session.status);

export const loading = createSelector(status, status => status === SessionStatus.Loading);
