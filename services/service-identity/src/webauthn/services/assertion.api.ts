import http from '@debens/http';

import { Tokens } from '../../auth/responses/tokens.dto';
import { ChallengeIdentityDTO } from '../requests/challenge-identity.dto';
import { VerifyIdentityDTO } from '../requests/verify-identity.dto';
import { Assertion } from '../responses/assertion.dto';

export class AssertionAPI {
    constructor(private readonly client = http.client) {}

    async create(request: ChallengeIdentityDTO) {
        return await this.client.post<ChallengeIdentityDTO, Assertion>('/webauthn/assertion', request);
    }

    async complete(request: VerifyIdentityDTO) {
        return await this.client.post<VerifyIdentityDTO, Tokens>('/webauthn/assertion/complete', request);
    }
}
