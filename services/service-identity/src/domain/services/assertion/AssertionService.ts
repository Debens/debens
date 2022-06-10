import {
    AuthenticatorAttachment,
    CredentialRequestOptions,
    FinalizationResponse,
    PublicKeyCredentialGet,
    UserVerificationRequirement,
} from '@teamhanko/hanko-node';

import { singleton } from 'tsyringe';

import { HankoClient } from '../hanko/HankoClient';

@singleton()
export class AssertionService {
    constructor(private readonly hanko: HankoClient) {}

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
