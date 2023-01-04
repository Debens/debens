import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import { Assertion } from '@debens/react-native-fido';
import { AssertionAPI, Tokens } from '@debens/service-identity';
import { supervise } from '@debens/toolkit-redux-saga';

import session from '../session';

import * as actions from './actions';

const client = http.client.extend([http.modules.domain('https://api.debens.app/identity')]);
const api = new AssertionAPI(client);
const service = new Assertion(api);

export function* start() {
    yield all([supervise(takeLatest)(actions.LOGIN, login)]);
}

function* login({ payload }: Action<actions.ILoginPayload>) {
    try {
        yield put(session.actions.loading());

        const response: Tokens = yield call([service, 'login'], payload);
        console.warn(response);

        yield put(session.actions.started());
    } catch (_error) {
        yield put(session.actions.error());
    }
}

export default start;
