import http from '@debens/http';

import type { Tokens } from '../../auth/responses/tokens.dto';
import type { CompleteIdentityDTO } from '../requests/complete-identity.dto';
import type { CreateIdentityDTO } from '../requests/create-identity.dto';
import type { Attestation } from '../responses/attestation.dto';

export class AttestationAPI {
    constructor(private readonly client = http.client) {}

    async create(request: CreateIdentityDTO) {
        return await this.client.post<CreateIdentityDTO, Attestation>('/webauthn/attestation', request);
    }

    async complete(request: CompleteIdentityDTO) {
        return await this.client.post<CompleteIdentityDTO, Tokens>('/webauthn/attestation/complete', request);
    }
}
