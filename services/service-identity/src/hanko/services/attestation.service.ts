import { Inject, Injectable } from '@nestjs/common';
import {
    AttestationConveyancePreference,
    AuthenticatorAttachment,
    CredentialCreationOptions,
    FinalizationResponse,
    PublicKeyCredentialCreate,
    UserVerificationRequirement,
} from '@teamhanko/hanko-node';

import { HankoClient } from './hanko-client';

interface CreateOptions {
    id: string;
    name?: string;
    displayName?: string;
}

@Injectable()
export class AttestationService {
    @Inject(HankoClient)
    private readonly hanko!: HankoClient;

    async create(options: CreateOptions): Promise<CredentialCreationOptions> {
        return await this.hanko.initializeRegistration({
            user: {
                id: options.id,
                name: options.name,
            },
            options: {
                authenticatorSelection: {
                    userVerification: UserVerificationRequirement.REQUIRED,
                    authenticatorAttachment: AuthenticatorAttachment.PLATFORM,
                    requireResidentKey: true,
                },
                attestation: AttestationConveyancePreference.NONE,
            },
        });
    }

    async complete(payload: PublicKeyCredentialCreate): Promise<FinalizationResponse> {
        return await this.hanko.finalizeRegistration(payload);
    }
}
