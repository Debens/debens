import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';

import * as actions from './passcode.actions';
import * as selectors from './passcode.selectors';
import { PasscodeState } from './passcode.state';

const loading = handleActions<boolean>(
    {
        [actions.LOADING]: (_, { payload }) => !!payload,
    },
    selectors.loading(INITIAL_STATE),
);

export default combineReducers<PasscodeState>({ loading });
