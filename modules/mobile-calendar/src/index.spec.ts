import * as root from './index';

describe('mobile-calendar module', () => {
    it('then should export the onboarding navigator', () => {
        expect(root.OnboardingNavigator).toBeTruthy();
    });
});
