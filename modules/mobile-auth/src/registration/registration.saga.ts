import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import messaging from '@debens/mobile-messaging';
import { Attestation } from '@debens/react-native-fido';
import { AttestationAPI, Tokens } from '@debens/service-identity';
import { supervise } from '@debens/toolkit-redux';

import session from '../session';

import * as actions from './registration.actions';

const client = http.client.extend([http.modules.domain('https://api.debens.app/identity')]);
const api = new AttestationAPI(client);
const service = new Attestation(api);

export function* start() {
    yield all([supervise(takeLatest)(actions.REGISTER, register)]);
}

function* register({ payload }: Action<actions.IRegisterPayload>) {
    try {
        yield put(session.actions.loading());

        const response: Tokens = yield call([service, 'register'], payload);
        console.warn(response);

        yield put(session.actions.started());
    } catch (error) {
        yield put(messaging.actions.snackbar({ message: `${error}`, type: 'error' }));

        yield put(session.actions.error());
    }
}

export default start;