import { AuthService } from '@debens/nestjs-auth';
import { Body, Controller, Inject, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { ChallengeIdentity } from '../commands/challenge-identity.command';
import { FinalizeCredentials } from '../commands/finalize-credentials.command';
import { RegisterCredentials } from '../commands/register-credentials.command';
import { VerifyIdentity } from '../commands/verify-identity.command';
import { ChallengeType } from '../identity.model';
import { IdentityRepository } from '../identity.repository';
import { ChallengeEmailDTO } from '../requests/challenge-email.dto';
import { RegisterEmailDTO } from '../requests/register-email.dto';
import { VerifyEmailDTO } from '../requests/verify-email.dto';
import { EmailChallengeDTO } from '../responses/email-challenge.dto';
import { Tokens } from '../responses/tokens.dto';

@ApiTags('Email')
@Controller('identity/:id/email')
export class EmailController {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(AuthService)
    private readonly auth!: AuthService;

    @Post('[:]register')
    @ApiParam({ name: 'id' })
    async register(@Param('id') id: string, @Body() payload: RegisterEmailDTO) {
        const response = await this.commandBus.execute(
            new RegisterCredentials({ identity: id, type: ChallengeType.Passcode, sign: payload }),
        );

        return response;
    }

    @Post('[:]finalize')
    @ApiParam({ name: 'id' })
    async complete(@Param('id') id: string, @Body() payload: VerifyEmailDTO): Promise<Tokens> {
        await this.commandBus.execute(
            new FinalizeCredentials({ identity: id, type: ChallengeType.Passcode, countersign: payload }),
        );

        return this.tokens(id);
    }

    @Post('[:]challenge')
    @ApiParam({ name: 'id' })
    /* TODO: allow specification of different email to challenge */
    async challenge(@Param('id') id: string, _?: ChallengeEmailDTO): Promise<EmailChallengeDTO> {
        const identity = await this.identities.findById(id);
        if (!identity) {
            throw new NotFoundException();
        }

        const response = await this.commandBus.execute(
            new ChallengeIdentity({
                identity: id,
                type: ChallengeType.Passcode,
                sign: {},
            }),
        );

        return response;
    }

    @Post('[:]verify')
    @ApiParam({ name: 'id' })
    async verify(@Param('id') id: string, @Body() payload: VerifyEmailDTO, @Res() response: Response) {
        const result = await this.commandBus.execute(
            new VerifyIdentity({ identity: id, type: ChallengeType.Passcode, countersign: payload }),
        );

        response.cookie('hanko', result.token, {
            httpOnly: true,
            sameSite: 'strict',
            domain: process.env.DOMAIN || 'localhost',
        });

        const tokens = await this.tokens(id);
        response.cookie('debens', tokens.access_token, {
            httpOnly: true,
            sameSite: 'strict',
            domain: process.env.TOKEN_DOMAIN || 'localhost',
        });

        response.send(tokens);
    }

    private readonly tokens = async (id: string) => ({
        access_token: await this.auth.getAccessToken(id),
        refresh_token: await this.auth.getRefreshToken(id),
    });
}
