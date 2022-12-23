import { ISagaModule } from 'redux-dynamic-modules-saga';

import { sagas } from './saga';

export const module: ISagaModule<Record<string, string>> = {
    id: 'onboarding',
    sagas: [sagas.start],
};
