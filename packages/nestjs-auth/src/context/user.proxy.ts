import { Inject } from '@nestjs/common';

import { Request } from 'express';
import { CLS_REQ, InjectableProxy } from 'nestjs-cls';

@InjectableProxy()
export class User {
    id?: string;

    token?: string;

    constructor(@Inject(CLS_REQ) request: Request) {
        this.token = request.cookies?.['debens'];
        if (!this.token) {
            this.token = request.headers.authorization?.split(' ')[1];
        }
    }
}
