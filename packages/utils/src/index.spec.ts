import { not } from './index';

describe("utils module", () => {
    it("then should export not", () => {
        expect(not).not.toBeFalsy();
    });
});
