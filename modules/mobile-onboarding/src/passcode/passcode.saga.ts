import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import auth from '@debens/mobile-auth';
import messaging from '@debens/mobile-messaging';
import navigation from '@debens/mobile-navigation';
import { Tokens, UserAPI } from '@debens/service-gateway';
import { supervise } from '@debens/toolkit-redux';

import { AxiosResponse } from 'axios';

import { OnboardingRoute } from '../navigation/routes';

import * as actions from './passcode.actions';

const client = http.client.extend([http.modules.domain('http://localhost:3001')]);
const api = new UserAPI(client);

export function* start() {
    yield all([
        supervise(takeLatest)(actions.LOGIN, login),
        supervise(takeLatest)(actions.COMPLETE, complete),
    ]);
}

function* login({ payload }: Action<actions.ILoginPayload>) {
    yield put(navigation.actions.navigate({ name: OnboardingRoute.Passcode, params: payload }));
}

function* complete({ payload }: Action<actions.ICompletePayload>) {
    try {
        yield put(actions.loading(true));

        const tokens: AxiosResponse<Tokens> = yield call([api.login, 'withPasscode'], payload);

        yield put(auth.actions.session(tokens.data));
    } catch (error: unknown) {
        yield put(messaging.actions.snackbar({ message: `${error}`, type: 'error' }));

        yield put(actions.error());
    } finally {
        yield put(actions.loading(false));
    }
}

export default start;
