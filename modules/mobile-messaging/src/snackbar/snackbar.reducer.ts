import { AnyAction, combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { INITIAL_STATE } from '../state';

import * as actions from './snackbar.actions';
import * as selectors from './snackbar.selectors';
import { Snackbar, SnackbarState } from './snackbar.state';

const show = handleActions<Snackbar[], Snackbar>(
    {
        [actions.SHOW]: (state, { payload }) => state.concat(payload).slice(-5),
    },
    selectors.snackbars(INITIAL_STATE),
);

const hide = handleActions<Snackbar[], string>(
    {
        [actions.HIDE]: (state, { payload }) => state.filter(snackbar => snackbar.id !== payload),
    },
    selectors.snackbars(INITIAL_STATE),
);

export default combineReducers<SnackbarState>({
    snackbars: (state: Snackbar[] | undefined, action: AnyAction): Snackbar[] =>
        [show, hide].reduce((previousState, currentReducer) => currentReducer(previousState, action), state!),
});
