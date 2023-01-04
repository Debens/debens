import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';

import * as actions from './session.actions';
import * as selectors from './session.selectors';
import { SessionState, SessionStatus } from './session.state';

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
