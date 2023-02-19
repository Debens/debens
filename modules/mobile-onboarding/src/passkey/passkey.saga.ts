import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import auth from '@debens/mobile-auth';
import messaging from '@debens/mobile-messaging';
import { AssertionRequest, module } from '@debens/react-native-fido';
import { Tokens, UserAPI } from '@debens/service-gateway';
import { supervise } from '@debens/toolkit-redux';

import { AxiosResponse } from 'axios';

import * as actions from './passkey.actions';

const client = http.client.extend([http.modules.domain('https://localhost:3001')]);
const api = new UserAPI(client);

export function* start() {
    yield all([supervise(takeLatest)(actions.LOGIN, login)]);
}

function* login({ payload }: Action<actions.ILoginPayload>) {
    try {
        yield put(actions.loading(true));

        const assertion: AssertionRequest = yield call([module, 'assertion'], payload);

        const tokens: AxiosResponse<Tokens> = yield call([api.login, 'withPasskey'], {
            ...assertion,
            user: '',
        });

        yield put(auth.actions.session(tokens.data));
    } catch (error: unknown) {
        yield put(messaging.actions.snackbar({ message: `${error}`, type: 'error' }));

        yield put(actions.error());
    } finally {
        yield put(actions.loading(false));
    }
}

export default start;
