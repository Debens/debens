import { GraphQLModule } from '@graphql-modules/core';

import { buildSchemaSync } from 'type-graphql';

import { UserResolver } from './UserResolver/UserResolver';

export const UserModule = new GraphQLModule({
    name: 'user',
    extraSchemas: () => [
        buildSchemaSync({
            resolvers: [UserResolver],
            container: ({ context }) => context.injector,
        }),
    ],
});
