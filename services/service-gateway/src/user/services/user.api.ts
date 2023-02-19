import http from '@debens/http';

import type { Challenge } from '@debens/service-identity';

import type { IdentifierDTO } from '../requests/identifier.dto';
import type { VerifyPasscodeDTO } from '../requests/verify-passcode.dto';
import type { VerifyPasskeyDTO } from '../requests/verify-passkey.dto';

export class UserAPI {
    constructor(private readonly client: typeof http.client) {}

    enter = async (email: string) =>
        await this.client.post<IdentifierDTO, Challenge>('/user/enter', { email });

    readonly login = {
        withPasscode: async (payload: VerifyPasscodeDTO) =>
            await this.client.post<VerifyPasscodeDTO>('/user/enter/:with-passcode', payload),
        withPasskey: async (payload: VerifyPasskeyDTO) =>
            await this.client.post<VerifyPasskeyDTO>('/user/enter/:with-passkey', payload),
    };
}
