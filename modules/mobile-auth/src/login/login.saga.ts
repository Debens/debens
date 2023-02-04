import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import messaging from '@debens/mobile-messaging';
import { Assertion } from '@debens/react-native-fido';
import { AssertionAPI, Tokens } from '@debens/service-identity';
import { supervise } from '@debens/toolkit-redux';

import session from '../session';

import * as actions from './login.actions';

const client = http.client.extend([http.modules.domain('https://api.debens.app/identity')]);
const api = new AssertionAPI(client);
const service = new Assertion(api);

export function* start() {
    yield all([supervise(takeLatest)(actions.LOGIN, login)]);
}

function* login({ payload }: Action<actions.ILoginPayload>) {
    try {
        yield put(session.actions.loading());

        const tokens: Tokens = yield call([service, 'login'], payload);

        yield put(session.actions.started(tokens));
    } catch (error: unknown) {
        yield put(messaging.actions.snackbar({ message: `${error}`, type: 'error' }));

        yield put(session.actions.error());
    }
}

export default start;
