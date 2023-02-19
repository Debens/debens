import { AuthService } from '@debens/nestjs-auth';
import { Body, Controller, Inject, NotFoundException, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ChallengeIdentity } from '../commands/challenge-identity.command';
import { FinalizeCredentials } from '../commands/finalize-credentials.command';
import { RegisterCredentials } from '../commands/register-credentials.command';
import { VerifyIdentity } from '../commands/verify-identity.command';
import { ChallengeType } from '../identity.model';
import { IdentityRepository } from '../identity.repository';
import { FinalizeDeviceDTO } from '../requests/finalize-device.dto';
import { VerifyDeviceDTO } from '../requests/verify-device.dto';
import { Tokens } from '../responses/tokens.dto';

@ApiTags('Device')
@Controller('identity/:id/device')
export class DeviceController {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(AuthService)
    private readonly auth!: AuthService;

    @Post('[:]register')
    @ApiParam({ name: 'id' })
    async register(@Param('id') id: string) {
        const response = await this.commandBus.execute(
            new RegisterCredentials({ identity: id, type: ChallengeType.Passkey, sign: undefined }),
        );

        return response;
    }

    @Post('[:]finalize')
    @ApiParam({ name: 'id' })
    async finalize(@Param('id') id: string, @Body() countersign: FinalizeDeviceDTO): Promise<Tokens> {
        const response = await this.commandBus.execute(
            new FinalizeCredentials({ identity: id, type: ChallengeType.Passkey, countersign }),
        );

        return this.tokens(response.user.id);
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
    async verify(@Param('id') id: string, @Body() countersign: VerifyDeviceDTO): Promise<Tokens> {
        const response = await this.commandBus.execute(
            new VerifyIdentity({ identity: id, type: ChallengeType.Passkey, countersign }),
        );

        return this.tokens(response.user.id);
    }

    private readonly tokens = async (id: string) => ({
        access_token: await this.auth.getAccessToken(id),
        refresh_token: await this.auth.getRefreshToken(id),
    });
}
