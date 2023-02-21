import http from '@debens/http';

import { DeviceChallengeDTO } from '../responses/device-challenge.dto';

import type { FinalizeDeviceDTO } from '../requests/finalize-device.dto';
import type { VerifyDeviceDTO } from '../requests/verify-device.dto';
import type { DeviceCredentalsDTO } from '../responses/device-credentials.dto';
import type { DeviceRegisterDTO } from '../responses/device-register.dto';
import type { EmailChallengeDTO } from '../responses/email-challenge.dto';
import type { IdentityState } from '../identity.model';
import type { CreateIdentityDTO } from '../requests/create-identity.dto';
import type { ChallengeEmailDTO } from './../requests/challenge-email.dto';
import type { VerifyEmailDTO } from '../requests/verify-email.dto';
import type { Tokens } from '../responses/tokens.dto';

export class IdentityAPI {
    constructor(private readonly client: typeof http.client) {}

    async create(email: string) {
        return await this.client.post<CreateIdentityDTO, IdentityState>('/identity', { email });
    }

    async get(id: string) {
        return await this.client.get<IdentityState>(`/identity/${id}`);
    }

    async search(email: string) {
        return await this.client.get<IdentityState>('/identity/:search', { params: { email } });
    }

    readonly email = {
        challenge: async (id: string, email?: string) =>
            await this.client.post<ChallengeEmailDTO, EmailChallengeDTO>(`/identity/${id}/email/:challenge`, {
                email,
            }),
        verify: async (id: string, code: string, challenge?: string) =>
            await this.client.post<VerifyEmailDTO, Tokens>(`/identity/${id}/email/:verify`, {
                id: challenge,
                code,
            }),
    };

    readonly device = {
        credentials: async () => await this.client.get<DeviceCredentalsDTO>('/identity/device/credentials'),

        register: async (id: string) =>
            await this.client.post<void, DeviceRegisterDTO>(`/identity/${id}/device/:register`, undefined),
        finalize: async (id: string, payload: FinalizeDeviceDTO) =>
            await this.client.post<FinalizeDeviceDTO>(`/identity/${id}/device/:finalize`, payload),

        challenge: async (id: string) =>
            await this.client.post<void, DeviceChallengeDTO>(`/identity/${id}/device/:challenge`, undefined),
        verify: async (id: string, dto: VerifyDeviceDTO) =>
            await this.client.post<VerifyDeviceDTO, Tokens>(`/identity/${id}/device/:verify`, dto),
    };
}
