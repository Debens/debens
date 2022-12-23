import { all, put, takeLatest } from 'redux-saga/effects';

import auth from '@debens/mobile-auth';
import navigation from '@debens/mobile-navigation';

export const sagas = {
    *start() {
        yield all([takeLatest(auth.actions.LOGGED_IN, sagas.onLoggedIn)]);
    },

    *onLoggedIn() {
        yield put(navigation.actions.navigate({ name: 'home' }));
    },
};
