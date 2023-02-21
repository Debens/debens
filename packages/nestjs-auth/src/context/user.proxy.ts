import { Inject } from '@nestjs/common';

import { Request } from 'express';
import { CLS_REQ, InjectableProxy } from 'nestjs-cls';

import { getTokenFromRequest } from '../utils/token-extractor';

@InjectableProxy()
export class User {
    id?: string;

    token?: string;

    constructor(@Inject(CLS_REQ) request: Request) {
        const token = getTokenFromRequest(request);
        if (token) {
            this.token = token;
        }
    }
}
