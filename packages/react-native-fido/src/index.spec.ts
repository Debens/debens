import * as root from './index';

describe('react-native-fido module', () => {
    it('then should export a attestation service', () => {
        expect(root.Attestation).toBeTruthy();
    });

    it('then should export a assertion service', () => {
        expect(root.Assertion).toBeTruthy();
    });
});
