import React, { memo } from 'react';

import { ApolloProvider } from '@apollo/client';
import { OptionalKeys } from '@training/utils';

import { client } from '../../default-client';

export type GraphQLProviderProps = OptionalKeys<React.ComponentProps<typeof ApolloProvider>, 'client'>;

export const GraphQLProvider: React.FunctionComponent<GraphQLProviderProps> = props => {
    return <ApolloProvider client={client} {...props} />;
};

export default memo(GraphQLProvider);
