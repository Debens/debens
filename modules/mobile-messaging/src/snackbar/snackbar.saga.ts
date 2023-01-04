import { Action } from 'redux-actions';
import { all, delay, put, race, take, takeEvery } from 'redux-saga/effects';

import { supervise } from '@debens/toolkit-redux';

import * as actions from './snackbar.actions';
import * as matchers from './snackbar.matchers';

export function* start() {
    yield all([supervise(takeEvery)(actions.SHOW, onShow)]);
}

function* onShow({ payload }: Action<actions.IShowPayload>) {
    const { timeout } = yield race({
        timeout: delay(5000),
        hidden: take(matchers.isHidden(payload.id)),
    });

    if (timeout) {
        yield put(actions.hide(payload.id));
    }
}

export default start;
