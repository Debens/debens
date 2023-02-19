import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import http from '@debens/http';
import messaging from '@debens/mobile-messaging';
import {
    ChallengeType,
    EnterChallengeDTO,
    UserAPI,
    WithPasscodeChallenge,
    WithPasskeyChallenge,
} from '@debens/service-gateway';
import { supervise } from '@debens/toolkit-redux';

import { AxiosResponse } from 'axios';

import passcode from '../passcode';
import passkey from '../passkey';

import * as actions from './login.actions';

const client = http.client.extend([http.modules.domain('http://localhost:3001')]);
const api = new UserAPI(client);

export function* start() {
    yield all([supervise(takeLatest)(actions.ENTER, enter)]);
}

function* enter({ payload }: Action<actions.IEnterPayload>) {
    try {
        yield put(actions.loading(true));

        const challenge: AxiosResponse<EnterChallengeDTO> = yield call([api, 'enter'], payload.email);

        switch (challenge.data.type) {
            case ChallengeType.Passcode:
                yield put(passcode.actions.login(challenge.data as WithPasscodeChallenge));
                break;
            case ChallengeType.Passkey:
                yield put(passkey.actions.login(challenge.data as WithPasskeyChallenge));
                break;
            default:
                yield put(
                    messaging.actions.snackbar({
                        message: 'Platform does not support login type',
                        type: 'error',
                    }),
                );
        }
    } catch (error) {
        yield put(messaging.actions.snackbar({ message: `${error}`, type: 'error' }));

        yield put(actions.error());
    } finally {
        yield put(actions.loading(false));
    }
}

export default start;
