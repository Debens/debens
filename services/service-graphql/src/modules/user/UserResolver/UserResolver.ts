import { Query, Resolver } from 'type-graphql';

import * as types from '../types';

@Resolver(types.User)
export class UserResolver {
    @Query(_return => types.User, { nullable: true })
    viewer(): types.User | null {
        return null;
    }
}
