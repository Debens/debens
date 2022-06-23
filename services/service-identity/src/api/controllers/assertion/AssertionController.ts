import { Body, Controller, Post, Route } from '@tsoa/runtime';

import { injectable } from 'tsyringe';

import { AssertionService } from '../../../domain/services/assertion/AssertionService';
import { ChallengeResponse, VerifyRequest } from '../../models/identity';

@injectable()
@Route('webauthn/assertion')
export class AssertionController extends Controller {
    constructor(private readonly assertion: AssertionService) {
        super();
    }

    @Post()
    async challenge(): Promise<ChallengeResponse> {
        return await this.assertion.challenge();
    }

    @Post('/complete')
    async verify(@Body() request: VerifyRequest): Promise<unknown> {
        return await this.assertion.verify(request);
    }
}
