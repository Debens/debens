import { AccessTokenGuard } from '@debens/nestjs-auth';
import {
    Body,
    Controller,
    Get,
    Inject,
    NotFoundException,
    Param,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { Hanko } from '../../hanko/context/hanko.proxy';
import { HankoPublicService } from '../../hanko/services/hanko-public.service';
import { ChallengeIdentity } from '../commands/challenge-identity.command';
import { FinalizeCredentials } from '../commands/finalize-credentials.command';
import { RegisterCredentials } from '../commands/register-credentials.command';
import { VerifyIdentity } from '../commands/verify-identity.command';
import { ChallengeType } from '../identity.model';
import { IdentityRepository } from '../identity.repository';
import { FinalizeDeviceDTO } from '../requests/finalize-device.dto';
import { VerifyDeviceDTO } from '../requests/verify-device.dto';
import { DeviceCredentalDTO, DeviceCredentalsDTO } from '../responses/device-credentials.dto';
import { DeviceRegisterDTO } from '../responses/device-register.dto';

@ApiTags('Device')
@Controller('identity/:id/device')
export class DeviceController {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(Hanko)
    private readonly hanko!: Hanko;

    @Inject(HankoPublicService)
    private readonly service!: HankoPublicService;

    @Get('credentials')
    @ApiParam({ name: 'id' })
    async credentials(): Promise<DeviceCredentalsDTO> {
        const credentials = await this.service.webauthn.list();

        return {
            count: credentials.length,
            results: credentials.map<DeviceCredentalDTO>(credentials => ({
                id: credentials.id,
                name: credentials.name,
                createdOn: credentials.created_at,
                publicKey: credentials.public_key,
            })),
        };
    }

    @Post('[:]register')
    @ApiParam({ name: 'id' })
    @UseGuards(AccessTokenGuard)
    async register(@Param('id') id: string) {
        const response: DeviceRegisterDTO = await this.commandBus.execute(
            new RegisterCredentials({ identity: id, type: ChallengeType.Passkey, sign: undefined }),
        );

        return response;
    }

    @Post('[:]finalize')
    @ApiParam({ name: 'id' })
    async finalize(@Param('id') id: string, @Body() countersign: FinalizeDeviceDTO) {
        await this.commandBus.execute(
            new FinalizeCredentials({ identity: id, type: ChallengeType.Passkey, countersign }),
        );
    }

    @Post('[:]challenge')
    @ApiParam({ name: 'id' })
    async challenge(@Param('id') id: string) {
        const identity = await this.identities.findById(id);
        if (!identity) {
            throw new NotFoundException();
        }

        const response = await this.commandBus.execute(
            new ChallengeIdentity({
                identity: id,
                type: ChallengeType.Passkey,
                sign: {},
            }),
        );

        return response;
    }

    @Post('[:]verify')
    @ApiParam({ name: 'id' })
    async verify(@Param('id') id: string, @Body() countersign: VerifyDeviceDTO, @Res() response: Response) {
        await this.commandBus.execute(
            new VerifyIdentity({ identity: id, type: ChallengeType.Passkey, countersign }),
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
