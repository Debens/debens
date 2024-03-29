import http from '@debens/http';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import hankoConfig from '../../config/hanko.config';
import { Hanko } from '../context/hanko.proxy';

/*
 * documentation: https://docs.hanko.io/api/public
 */
@Injectable()
export class HankoPublicService {
    constructor(@Inject(hankoConfig.KEY) config: ConfigType<typeof hankoConfig>, private context: Hanko) {
        this.client = http.client.extend([http.modules.domain(config.publicUrl)]);
    }

    client: typeof http.client;

    readonly user = {
        getByEmail: async (email: string) =>
            await this.client
                .post<
                    { email: string },
                    { id: string; email_id: string; verified: boolean; has_webauthn_credential: boolean }
                >('/user', { email })
                .then(({ data }) => data),

        create: async (email: string) =>
            await this.client
                .post<{ email: string }, { user_id: string; email_id: string }>('/users', { email })
                .then(({ data }) => data),
    };

    readonly email = {
        list: async () =>
            await this.client
                .get<Array<{ id: string; address: string; is_verified: boolean; is_primary: boolean }>>(
                    '/emails',
                    {
                        headers: {
                            Authorization: `Bearer ${this.context.token}`,
                        },
                    },
                )
                .then(({ data }) => data),

        create: async (address: string) =>
            await this.client.post<
                { address: string },
                { address: string; created_at: string; id: string; updated_at: string; verified: boolean }
            >(
                '/emails',
                { address },
                {
                    headers: {
                        Authorization: `Bearer ${this.context.token}`,
                    },
                },
            ),

        delete: async (id: string) =>
            await this.client.delete(`/emails/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.context.token}`,
                },
            }),

        markPrimary: async (id: string) =>
            await this.client.post(`/emails/${id}/set_primary`, undefined, {
                headers: {
                    Authorization: `Bearer ${this.context.token}`,
                },
            }),
    };

    readonly passcode = {
        initialize: async (user: string, email?: string) =>
            await this.client
                .post<
                    { user_id: string; email_id?: string },
                    { id: string; ttl: number; created_at: string }
                >(
                    '/passcode/login/initialize',
                    { user_id: user, email_id: email },
                    {
                        headers: {
                            Cookie: `hanko_email_id=${this.context.email}`,
                        },
                    },
                )
                .then(({ data }) => data),

        /**
         * @param payload id of the origin challenge combined with the passcode
         */
        finalize: async (payload: { id: string; code: string }) =>
            await this.client
                .post<typeof payload, { id: string; ttl: number; created_at: string }>(
                    '/passcode/login/finalize',
                    payload,
                )
                .then(({ data, headers }) => {
                    this.context.token = headers['x-auth-token'];
                    return data;
                }),
    };

    readonly webauthn = {
        attestation: {
            initalize: async () =>
                await this.client
                    .post<
                        undefined,
                        {
                            publicKey: {
                                rp: { name: string; id: string };
                                user: { id: string; name?: string; displayName?: string };
                                challenge: string;
                                pubKeyCredParams: { type: string; alg: number }[];
                                timeout: number;
                                authenticatorSelection: {
                                    authenticatorAttachment: string;
                                    requireResidentKey: number;
                                    residentKey: string;
                                    userVerification: string;
                                };
                                attestation: string;
                            };
                        }
                    >('/webauthn/registration/initialize', undefined, {
                        headers: {
                            Authorization: `Bearer ${this.context.token}`,
                        },
                    })
                    .then(({ data }) => data),

            finalize: async (payload: {
                id: string;
                rawId: string;
                type: string;
                response: { clientDataJson: string; attestationObject: string; transports?: string };
            }) =>
                await this.client
                    .post<typeof payload, { credential_id: string; user_id: string }>(
                        '/webauthn/registration/finalize',
                        payload,
                        {
                            headers: {
                                Authorization: `Bearer ${this.context.token}`,
                            },
                        },
                    )
                    .then(({ data }) => data),
        },
        assertion: {
            initalize: async (id: string) =>
                await this.client
                    .post<
                        { user_id: string },
                        {
                            publicKey: {
                                challenge: string;
                                timeout: number;
                                rpId: string;
                                allowCredentials: { type: string; id: string }[];
                                userVerification: string;
                            };
                        }
                    >('/webauthn/login/initialize', { user_id: id })
                    .then(({ data }) => data),

            finalize: async (payload: {
                id: string;
                rawId: string;
                type: string;
                response: {
                    clientDataJson: string;
                    authenticatorData: string;
                    signature: string;
                    userHandle: string;
                };
            }) =>
                await this.client
                    .post<typeof payload, { credential_id: string; user_id: string }>(
                        '/webauthn/login/finalize',
                        payload,
                    )
                    .then(({ data, headers }) => {
                        this.context.token = headers['x-auth-token'];
                        return data;
                    }),
        },

        list: async () =>
            await this.client
                .get<
                    Array<{
                        id: string;
                        name: string;
                        public_key: string;
                        aaguid: string;
                        transports: string[];
                        created_at: string;
                    }>
                >('/webauthn/credentials', {
                    headers: {
                        Authorization: `Bearer ${this.context.token}`,
                    },
                })
                .then(({ data }) => data),

        update: async (id: string, name: string) =>
            await this.client
                .put<{ name: string }>(
                    `/webauthn/credentials/${id}`,
                    { name },
                    {
                        headers: {
                            Authorization: `Bearer ${this.context.token}`,
                        },
                    },
                )
                .then(({ data }) => data),

        delete: async (id: string) =>
            await this.client.delete(`/webauthn/credentials/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.context.token}`,
                },
            }),
    };
}
