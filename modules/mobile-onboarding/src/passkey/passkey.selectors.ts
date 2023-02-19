import { createSelector, Selector } from 'reselect';

import { OnboardingModuleState } from '../state';

import { PasskeyState } from './passkey.state';

export const passkey: Selector<OnboardingModuleState, PasskeyState> = state => state.onboarding.passkey;

export const loading = createSelector(passkey, passkey => passkey.loading);
