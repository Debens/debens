import { NativeModules } from 'react-native';

import {
    AssertionResult,
    AttestationService,
    CreateIdentityRequest,
} from '@debens/service-identity';

import { AttestationRequest } from '../../native-module';

export class Attestation {
    constructor(private readonly service: AttestationService) {}

    async register(params: CreateIdentityRequest): Promise<AssertionResult> {
        const challenge = await this.create(params);
        return await this.complete(challenge);
    }

    private async create(params: CreateIdentityRequest): Promise<AttestationRequest> {
        const { data: request } = await this.service.create(params);

        return await NativeModules.Fido.attestation(request);
    }

    private async complete(request: AttestationRequest): Promise<AssertionResult> {
        const { data: assertion } = await this.service.complete(request);

        return assertion;
    }
}
