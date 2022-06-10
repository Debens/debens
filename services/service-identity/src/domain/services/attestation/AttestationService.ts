import {
    AttestationConveyancePreference,
    AuthenticatorAttachment,
    CredentialCreationOptions,
    FinalizationResponse,
    PublicKeyCredentialCreate,
    UserVerificationRequirement,
} from '@teamhanko/hanko-node';

import { singleton } from 'tsyringe';
import * as uuid from 'uuid';

import { HankoClient } from '../hanko/HankoClient';

interface CreateOptions {
    id?: string;
    name?: string;
    displayName?: string;
}

@singleton()
export class AttestationService {
    constructor(private readonly hanko: HankoClient) {}

    async create(options: CreateOptions): Promise<CredentialCreationOptions> {
        return await this.hanko.initializeRegistration({
            user: {
                id: uuid.v4(),
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
