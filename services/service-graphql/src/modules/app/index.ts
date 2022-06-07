import { GraphQLModule } from '@graphql-modules/core';

import { UserModule } from '../user/index';

export const AppModule = new GraphQLModule({
    name: 'app',
    imports: () => [UserModule],
});
