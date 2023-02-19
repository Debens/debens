import { combineReducers } from 'redux';
import { ISagaModule } from 'redux-dynamic-modules-saga';

import session from './session';
import { AuthModuleState } from './state';

export const module: ISagaModule<AuthModuleState> = {
    id: 'auth',
    reducerMap: {
        auth: combineReducers({
            session: session.reducer,
        }),
    },
};
