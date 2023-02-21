import { IdentityAPI } from '@debens/service-identity';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver } from '@nestjs/graphql';

import { GraphQLGuard } from '../../auth/graphql.guard';
import { Claims, ClaimsType } from '../decorators/claims.decorator';
import * as types from '../user.types';

@Injectable()
@Resolver(types.User)
export class UserResolver {
    @Inject(IdentityAPI)
    private readonly identity!: IdentityAPI;

    @UseGuards(GraphQLGuard)
    @Query(_return => types.User, { nullable: true })
    async viewer(@Claims() claims: ClaimsType): Promise<types.User | null> {
        const identity = await this.identity.get(claims.sub).then(response => response.data);
        return new types.User({ id: identity.id, email: identity.email });
    }

    @ResolveField(_return => types.Names)
    names() {
        return new types.Names({ display: 'Stranger' });
    }

    @ResolveField(_return => types.Credentials)
    credentials() {
        return new types.Credentials();
    }
}
