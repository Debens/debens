import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';

import * as actions from './passkey.actions';
import * as selectors from './passkey.selectors';
import { PasskeyState } from './passkey.state';

const loading = handleActions<boolean>(
    {
        [actions.LOADING]: (_, { payload }) => !!payload,
    },
    selectors.loading(INITIAL_STATE),
);

export default combineReducers<PasskeyState>({ loading });
