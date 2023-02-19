import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';

import * as actions from './login.actions';
import * as selectors from './login.selectors';
import { LoginState } from './login.state';

const loading = handleActions<boolean>(
    {
        [actions.LOADING]: (_, { payload }) => !!payload,
    },
    selectors.loading(INITIAL_STATE),
);

export default combineReducers<LoginState>({ loading });
