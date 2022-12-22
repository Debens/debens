import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './actions';
import * as selectors from './selectors';
import { AuthState, INITIAL_STATE } from './state';

const loading = handleActions<boolean>(
    {
        [actions.LOADING]: (_, { payload }) => !!payload,
    },
    selectors.loading(INITIAL_STATE),
);

export default combineReducers<AuthState>({ loading });
