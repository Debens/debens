import { AuthService } from '@debens/nestjs-auth';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebAuthnCredential } from '@teamhanko/hanko-node';

import { Tokens } from '../auth/responses/tokens.dto';

import { Attest } from './commands/attest.command';
import { CompleteAttestation } from './commands/complete-attestation.command';
import { CompleteIdentityDTO } from './requests/complete-identity.dto';
import { CreateIdentityDTO } from './requests/create-identity.dto';
import { Attestation } from './responses/attestation.dto';

@ApiTags('WebAuthn')
@Controller('webauthn/attestation')
export class AttestationController {
    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(AuthService)
    private readonly auth!: AuthService;

    @Post()
    @ApiResponse({ type: Attestation })
    async create(@Body() dto: CreateIdentityDTO): Promise<Attestation> {
        return await this.commandBus.execute(new Attest(dto));
    }

    @Post('complete')
    @ApiResponse({ type: Tokens })
    async complete(@Body() dto: CompleteIdentityDTO): Promise<Tokens> {
        const response: WebAuthnCredential = await this.commandBus.execute(new CompleteAttestation(dto));

        return {
            access_token: await this.auth.getAccessToken(response.user.id),
            refresh_token: await this.auth.getRefreshToken(response.user.id),
        };
    }
}
