import { Action } from 'redux-actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { supervise } from '@debens/toolkit-redux';

import * as actions from './session.actions';
import * as tokens from './session.tokens';

export function* start() {
    yield all([supervise(takeLatest)(actions.START, session)]);
}

function* session({ payload }: Action<actions.IStartPayload>) {
    try {
        yield all({
            access: call([tokens.access, 'set'], payload.access_token),
            refresh: call([tokens.refresh, 'set'], payload.refresh_token),
        });

        yield put(actions.started());
    } catch (error) {
        yield put(actions.error(error));
    }
}

export default start;
