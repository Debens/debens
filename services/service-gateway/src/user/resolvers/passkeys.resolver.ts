import { IdentityAPI } from '@debens/service-identity';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';

import { GraphQLGuard } from '../../auth/graphql.guard';
import { Claims, ClaimsType } from '../decorators/claims.decorator';
import * as types from '../user.types';

@Injectable()
@Resolver(types.Passkeys)
export class PasskeysResolver {
    @Inject(IdentityAPI)
    private readonly identity!: IdentityAPI;

    @UseGuards(GraphQLGuard)
    @ResolveField(_return => [types.WebAuthnCredential])
    async registered(@Claims() claims: ClaimsType) {
        const identity = await this.identity.get(claims.sub).then(response => response.data);
        return identity.credentials.map<types.WebAuthnCredential>(({ id }) => ({ id }));
    }

    @UseGuards(GraphQLGuard)
    @ResolveField(_return => types.PasskeyChallenge, { nullable: true })
    async challenge(@Claims() claims: ClaimsType): Promise<types.PasskeyChallenge> {
        return await this.identity.device.register(claims.sub).then(response => response.data);
    }

    @UseGuards(GraphQLGuard)
    @Mutation(_returns => types.AttestationResult)
    async passkey(@Claims() claims: ClaimsType, @Args('credentials') payload: types.PublicKeyCredential) {
        await this.identity.device.finalize(claims.sub, payload);

        return { success: true };
    }
}
