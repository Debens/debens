import * as root from './index';

describe('mobile-onboarding module', () => {
    it('then should export the onboarding navigator', () => {
        expect(root.OnboardingNavigator).toBeTruthy();
    });
});
