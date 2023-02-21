import { Body, Controller, Inject, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { Hanko } from '../../hanko/context/hanko.proxy';
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

@ApiTags('Email')
@Controller('identity/:id/email')
export class EmailController {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(Hanko)
    private readonly hanko!: Hanko;

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
    async complete(@Param('id') id: string, @Body() payload: VerifyEmailDTO, @Res() response: Response) {
        await this.commandBus.execute(
            new FinalizeCredentials({ identity: id, type: ChallengeType.Passcode, countersign: payload }),
        );

        response
            .cookie('debens', this.hanko.token, {
                httpOnly: true,
                sameSite: 'strict',
                domain: process.env.TOKEN_DOMAIN || 'localhost',
            })
            .status(200)
            .send();
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
        await this.commandBus.execute(
            new VerifyIdentity({ identity: id, type: ChallengeType.Passcode, countersign: payload }),
        );

        response
            .cookie('debens', this.hanko.token, {
                httpOnly: true,
                sameSite: 'strict',
                domain: process.env.TOKEN_DOMAIN || 'localhost',
            })
            .status(200)
            .send({ access_token: this.hanko.token });
    }
}
