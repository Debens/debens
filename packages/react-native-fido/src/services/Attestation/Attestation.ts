import { NativeModules } from 'react-native';

import { AttestationAPI, CreateIdentityDTO, Tokens } from '@debens/service-identity';

import { AttestationRequest } from '../../native-module';

export class Attestation {
    constructor(private readonly api: AttestationAPI) {}

    async register(params: CreateIdentityDTO): Promise<Tokens> {
        const challenge = await this.create(params);
        return await this.complete(challenge);
    }

    private async create(params: CreateIdentityDTO): Promise<AttestationRequest> {
        const { data: request } = await this.api.create(params);

        return await NativeModules.Fido.attestation(request);
    }

    private async complete(request: AttestationRequest): Promise<Tokens> {
        const { data: assertion } = await this.api.complete(request);

        return assertion;
    }
}
