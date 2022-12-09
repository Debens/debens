import { Inject, Injectable } from '@nestjs/common';
import {
    AuthenticatorAttachment,
    CredentialRequestOptions,
    FinalizationResponse,
    PublicKeyCredentialGet,
    UserVerificationRequirement,
} from '@teamhanko/hanko-node';

import { HankoClient } from './hanko-client';

@Injectable()
export class AssertionService {
    @Inject(HankoClient)
    private readonly hanko!: HankoClient;

    async challenge(user?: string): Promise<CredentialRequestOptions> {
        return await this.hanko.initializeAuthentication({
            /*
             * TODO: get from db
             *
             * When using requireResidentKey we don't need to provide a user object
             */
            user: user ? { id: user } : undefined,
            options: {
                userVerification: UserVerificationRequirement.REQUIRED,
                authenticatorAttachment: AuthenticatorAttachment.PLATFORM,
            },
        });
    }

    async verify(payload: PublicKeyCredentialGet): Promise<FinalizationResponse> {
        return await this.hanko.finalizeAuthentication(payload);
    }
}
