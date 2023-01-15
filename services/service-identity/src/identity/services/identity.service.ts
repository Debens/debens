import http from '@debens/http';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import identityConfig from '../../config/identity.config';

import { IdentityAPI } from './identity.api';

@Injectable()
export class IdentityService extends IdentityAPI {
    constructor(@Inject(identityConfig.KEY) config: ConfigType<typeof identityConfig>) {
        super(
            http.client.extend([
                http.modules.domain(config.url),
                http.modules.bearer({
                    /* FIXME: get from some session data? */
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZTMzOTAwYy1iNWM0LTRjZjYtOTY3Zi0zOTQ2ODdlODIzNzMiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.zOaU3IbpmS858iNE8jOelaaiZBECjv0aYroUtnOauBs',
                }),
            ]),
        );
    }
}
