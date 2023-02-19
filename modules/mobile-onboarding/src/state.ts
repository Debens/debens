import { LoginState } from './login/login.state';
import { PasscodeState } from './passcode/passcode.state';
import { PasskeyState } from './passkey/passkey.state';

export interface OnboardingState {
    login: LoginState;
    passcode: PasscodeState;
    passkey: PasskeyState;
}

export interface OnboardingModuleState {
    onboarding: OnboardingState;
}

export const INITIAL_STATE: OnboardingModuleState = {
    onboarding: {
        login: {
            loading: false,
        },
        passcode: {
            loading: false,
        },
        passkey: {
            loading: false,
        },
    },
};
