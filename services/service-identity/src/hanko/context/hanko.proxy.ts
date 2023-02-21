import { getTokenFromRequest } from '@debens/nestjs-auth';
import { Inject } from '@nestjs/common';

import { Request } from 'express';
import { CLS_REQ, InjectableProxy } from 'nestjs-cls';

@InjectableProxy()
export class Hanko {
    token?: string | null;

    email?: string;

    constructor(@Inject(CLS_REQ) request: Request) {
        this.token = getTokenFromRequest(request);
        this.email = request.cookies?.['hanko_email_id'];
    }
}
