import { Action } from 'redux-actions';
import { all, call, takeLatest } from 'redux-saga/effects';

import { CommonActions } from '@react-navigation/native';

import * as actions from './actions';
import { navigation } from './NavigationProvider';

export const sagas = {
    *start() {
        yield all([takeLatest(actions.NAVIGATE, sagas.navigate)]);
    },
    *navigate({ payload }: Action<actions.INavigatePayload>) {
        yield call([navigation, 'dispatch'], CommonActions.navigate(payload));
    },
};
