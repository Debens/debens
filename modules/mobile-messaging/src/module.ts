import { combineReducers } from 'redux';
import { ISagaModule } from 'redux-dynamic-modules-saga';

import snackbar from './snackbar';
import { MessagingModuleState } from './state';

export const module: ISagaModule<MessagingModuleState> = {
    id: 'messaging',
    reducerMap: {
        messaging: combineReducers({
            snackbar: snackbar.reducer,
        }),
    },
    sagas: [snackbar.saga],
};
