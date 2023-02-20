import { ApolloClient, createHttpLink, InMemoryCache, setContext } from '@debens/graphql';
import auth from '@debens/mobile-auth';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    const token = await auth.tokens.access.get();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
