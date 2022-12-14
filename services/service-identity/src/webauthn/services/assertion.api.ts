import http from '@debens/http';

import type { Tokens } from '../../auth/responses/tokens.dto';
import type { ChallengeIdentityDTO } from '../requests/challenge-identity.dto';
import type { VerifyIdentityDTO } from '../requests/verify-identity.dto';
import type { Assertion } from '../responses/assertion.dto';

export class AssertionAPI {
    constructor(private readonly client = http.client) {}

    async create(request: ChallengeIdentityDTO) {
        return await this.client.post<ChallengeIdentityDTO, Assertion>('/webauthn/assertion', request);
    }

    async complete(request: VerifyIdentityDTO) {
        return await this.client.post<VerifyIdentityDTO, Tokens>('/webauthn/assertion/complete', request);
    }
}
