import { combineReducers } from 'redux';
import { ISagaModule } from 'redux-dynamic-modules-saga';

import login from './login';
import passcode from './passcode';
import passkey from './passkey';
import { sagas } from './saga';
import { OnboardingModuleState } from './state';

export const module: ISagaModule<OnboardingModuleState> = {
    id: 'onboarding',
    reducerMap: {
        onboarding: combineReducers({
            login: login.reducer,
            passkey: passkey.reducer,
            passcode: passcode.reducer,
        }),
    },
    sagas: [sagas.start, login.saga, passcode.saga, passkey.saga],
};
