import { createStore as createModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

export const store = createModuleStore({
    extensions: [getSagaExtension()],
});

export default store;
