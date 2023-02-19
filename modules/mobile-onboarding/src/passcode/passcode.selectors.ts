import { createSelector, Selector } from 'reselect';

import { OnboardingModuleState } from '../state';

import { PasscodeState } from './passcode.state';

export const passcode: Selector<OnboardingModuleState, PasscodeState> = state => state.onboarding.passcode;

export const loading = createSelector(passcode, passcode => passcode.loading);
