import { Body, Controller, Post, Route } from 'tsoa';
import { injectable } from 'tsyringe';

import { AttestationService } from '../../../domain/services/attestation/AttestationService';
import {
    CompleteIdentityRequest,
    CreateIdentityRequest,
    CreateIdentityResponse,
} from '../../models/identity';

@injectable()
@Route('webauthn/attestation')
export class AttestationController extends Controller {
    constructor(private readonly attestation: AttestationService) {
        super();
    }

    @Post()
    async create(@Body() request: CreateIdentityRequest): Promise<CreateIdentityResponse> {
        return await this.attestation.create(request);
    }

    @Post('/complete')
    async complete(@Body() request: CompleteIdentityRequest): Promise<unknown> {
        return await this.attestation.complete(request);
    }
}
