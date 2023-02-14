import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HankoWebAuthnClient } from '@teamhanko/hanko-node';

import hankoConfig from '../../config/hanko.config';

@Injectable()
export class HankoClient extends HankoWebAuthnClient {
    constructor(@Inject(hankoConfig.KEY) config: ConfigType<typeof hankoConfig>) {
        super({
            apiUrl: config.apiUrl,
            apiSecret: config.apiSecret,
            apiKeyId: config.apiKeyId,
        });
    }
}
