import http from '@debens/http';

import { Tokens } from '../../auth/responses/tokens.dto';
import { CompleteIdentityDTO } from '../requests/complete-identity.dto';
import { CreateIdentityDTO } from '../requests/create-identity.dto';
import { Attestation } from '../responses/attestation.dto';

export class AttestationAPI {
    constructor(private readonly client = http.client) {}

    async create(request: CreateIdentityDTO) {
        return await this.client.post<CreateIdentityDTO, Attestation>('/webauthn/attestation', request);
    }

    async complete(request: CompleteIdentityDTO) {
        return await this.client.post<CompleteIdentityDTO, Tokens>('/webauthn/attestation/complete', request);
    }
}
