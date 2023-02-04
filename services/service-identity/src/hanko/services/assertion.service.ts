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

    async challenge(id: string): Promise<CredentialRequestOptions> {
        return await this.hanko.initializeAuthentication({
            user: { id },
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
