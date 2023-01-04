import { createSelector, Selector } from 'reselect';

import { MessagingModuleState } from '../state';

import { SnackbarState } from './snackbar.state';

export const root: Selector<MessagingModuleState, SnackbarState> = state => state.messaging.snackbar;

export const snackbars = createSelector(root, root => root.snackbars);
