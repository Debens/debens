import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';

import * as actions from './actions';
import * as selectors from './selectors';
import { SessionState, SessionStatus } from './state';

const status = handleActions<SessionStatus>(
    {
        [actions.LOADING]: () => SessionStatus.Loading,
        [actions.STARTED]: () => SessionStatus.Authenticated,
        [actions.STOPPED]: () => SessionStatus.Unauthenticated,
        [actions.ERROR]: () => SessionStatus.Unauthenticated,
    },
    selectors.status(INITIAL_STATE),
);

export default combineReducers<SessionState>({ status });
