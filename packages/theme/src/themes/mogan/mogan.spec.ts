import { mógan } from './mogan';

describe('mógan theme', () => {
    it('then should not have any unexpected changes', () => {
        expect(mógan).toMatchSnapshot();
    });
});
