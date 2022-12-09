import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebAuthnCredential } from '@teamhanko/hanko-node';

import { AuthService } from '../auth/auth.service';
import { Tokens } from '../auth/responses/tokens.dto';

import { Assert } from './commands/assert.command';
import { CompleteAssertion } from './commands/complete-assertion.command';
import { ChallengeIdentityDTO } from './requests/challenge-identity.dto';
import { VerifyIdentityDTO } from './requests/verify-identity.dto';
import { Assertion } from './responses/assertion.dto';

@ApiTags('WebAuthn')
@Controller('webauthn/assertion')
export class AssertionController {
    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(AuthService)
    private readonly auth!: AuthService;

    @Post()
    @ApiResponse({ type: Assertion })
    async create(@Body() dto: ChallengeIdentityDTO): Promise<Assertion> {
        return await this.commandBus.execute(new Assert(dto));
    }

    @Post('complete')
    @ApiResponse({ type: Tokens })
    async complete(@Body() dto: VerifyIdentityDTO): Promise<Tokens> {
        const response: WebAuthnCredential = await this.commandBus.execute(new CompleteAssertion(dto));

        return {
            access_token: await this.auth.getAccessToken(response.user.id),
            refresh_token: await this.auth.getRefreshToken(response.user.id),
        };
    }
}
