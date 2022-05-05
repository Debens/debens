import { themes } from './';
import { light } from './themes/light/light';

describe('themes module', () => {
    it('then should export the light theme', () => {
        expect(themes.light).toBe(light);
    });
});
