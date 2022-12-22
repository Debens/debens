import { ISagaModule } from 'redux-dynamic-modules-saga';

import reducer from './reducer';
import { sagas } from './saga';
import { AuthModuleState } from './state';

export const module: ISagaModule<AuthModuleState> = {
    id: 'auth',
    reducerMap: {
        auth: reducer,
    },
    sagas: [sagas.start],
};
