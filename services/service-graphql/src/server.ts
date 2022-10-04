import 'dotenv/config';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import { AppModule } from './modules/app/index';

const server = new ApolloServer({
    schema: AppModule.schema,
    csrfPrevention: true,
    mocks: Boolean(process.env.ENABLE_MOCKS),
});

server.listen({ port: process.env.PORT || 3001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
