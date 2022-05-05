import { light } from './light';

describe('light theme', () => {
    it('then should not have any unexpected changes', () => {
        expect(light).toMatchSnapshot();
    });
});
