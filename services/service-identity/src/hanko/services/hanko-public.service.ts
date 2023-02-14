import http from '@debens/http';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import hankoConfig from '../../config/hanko.config';

/*
 * documentation: https://docs.hanko.io/api/public
 */
@Injectable()
export class HankoPublicService {
    constructor(@Inject(hankoConfig.KEY) config: ConfigType<typeof hankoConfig>) {
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

    readonly passcode = {
        initialize: async (user: string, email?: string) =>
            await this.client
                .post<
                    { user_id: string; email_id?: string },
                    { id: string; ttl: number; created_at: string }
                >('/passcode/login/initialize', { user_id: user, email_id: email })
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
                    console.error(headers);
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
                    >('/webauthn/registration/initialize', undefined)
                    .then(({ data }) => data),

            finalize: async (payload: {
                id: string;
                rawId: string;
                type: string;
                response: { clientDataJson: string; attestationObject: string; transports: string };
            }) =>
                await this.client
                    .post<typeof payload, { credential_id: string; user_id: string }>(
                        '/webauthn/registration/finalize',
                        payload,
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
                    .then(({ data }) => data),
        },
    };
}
