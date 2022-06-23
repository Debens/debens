import * as root from './index';

describe('graphql module', () => {
    it('then should export a GraphQLProvider', () => {
        expect(root.GraphQLProvider).toBeTruthy();
    });
});
