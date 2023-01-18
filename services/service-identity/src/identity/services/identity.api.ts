import http from '@debens/http';

import type { IdentityState } from '../identity.aggregate';

export class IdentityAPI {
    constructor(private readonly client = http.client) {}

    async get(id: string) {
        return await this.client.get<IdentityState>(`/identity/${id}`);
    }
}
