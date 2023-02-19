import { createSelector, Selector } from 'reselect';

import { OnboardingModuleState } from '../state';

import { LoginState } from './login.state';

export const login: Selector<OnboardingModuleState, LoginState> = state => state.onboarding.login;

export const loading = createSelector(login, login => login.loading);
