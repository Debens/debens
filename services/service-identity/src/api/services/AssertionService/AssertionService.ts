import http from '@training/http';

import { AssertionResult, ChallengeRequest, ChallengeResponse, VerifyRequest } from '../../models/identity';

export class AssertionService {
    constructor(private readonly client = http.client) {}

    async create(request?: ChallengeRequest) {
        return await this.client.post<ChallengeRequest | undefined, ChallengeResponse>(
            '/webauthn/assertion',
            request,
        );
    }

    async complete(request: VerifyRequest) {
        return await this.client.post<VerifyRequest, AssertionResult>(
            '/webauthn/assertion/complete',
            request,
        );
    }
}
