import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import { Assertion, Attestation } from '@debens/react-native-fido';
import { AssertionAPI, AttestationAPI, Tokens } from '@debens/service-identity';

import * as actions from './actions';

const client = http.client.extend([http.modules.domain('https://api.debens.app/identity')]);
const apis = {
    assertion: new AssertionAPI(client),
    attestation: new AttestationAPI(client),
};

const services = {
    assertion: new Assertion(apis.assertion),
    attestation: new Attestation(apis.attestation),
};

export const sagas = {
    *start() {
        yield all([takeLatest(actions.REGISTER, sagas.register), takeLatest(actions.LOGIN, sagas.login)]);
    },
    *register({ payload }: Action<actions.IRegisterPayload>) {
        try {
            yield put(actions.loading(true));

            const response: Tokens = yield call([services.attestation, 'register'], payload);
            console.warn(response);
        } finally {
            yield put(actions.loading(false));
        }
    },
    *login({ payload }: Action<actions.ILoginPayload>) {
        try {
            yield put(actions.loading(true));

            const response: Tokens = yield call([services.assertion, 'login'], payload);
            console.warn(response);
        } finally {
            yield put(actions.loading(false));
        }
    },
};
