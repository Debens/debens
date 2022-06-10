import { HankoWebAuthnClient } from '@teamhanko/hanko-node';

import { singleton } from 'tsyringe';

@singleton()
export class HankoClient extends HankoWebAuthnClient {
    constructor() {
        super({
            apiUrl: process.env.HANKO_API_URL!,
            apiSecret: process.env.HANKO_API_SECRET!,
            apiKeyId: process.env.HANKO_API_KEY_ID!,
        });
    }
}
