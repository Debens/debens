import * as root from './index';

describe('mobile-calendar module', () => {
    it('then should export the calendar navigator', () => {
        expect(root.CalendarNavigator).toBeTruthy();
    });
});
