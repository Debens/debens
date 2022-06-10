import http from '@training/http';

import {
    AssertionResult,
    CompleteIdentityRequest,
    CreateIdentityRequest,
    CreateIdentityResponse,
} from '../../models/identity';

export class AttestationService {
    constructor(private readonly client = http.client) {}

    async create(request: CreateIdentityRequest) {
        return await this.client.post<CreateIdentityRequest, CreateIdentityResponse>(
            '/webauthn/attestation',
            request,
        );
    }

    async complete(request: CompleteIdentityRequest) {
        return await this.client.post<CompleteIdentityRequest, AssertionResult>(
            '/webauthn/attestation/complete',
            request,
        );
    }
}
