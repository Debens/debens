import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { HankoAdminService } from '../../hanko/services/hank-admin.service';
import { CreateIdentity } from '../commands/create-identity.command';
import { IdentityState } from '../identity.model';
import { IdentityRepository } from '../identity.repository';
import { CreateIdentityDTO } from '../requests/create-identity.dto';

@ApiTags('Identity')
@Controller('identity')
export class IdentityController {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(HankoAdminService)
    private readonly admin!: HankoAdminService;

    @Post()
    async create(@Body() identity: CreateIdentityDTO, @Res() response: Response) {
        const result = await this.commandBus.execute(new CreateIdentity(identity));

        response.cookie('hanko_email_id', result.state.email[0]?.id);

        response.send(result.state);
    }

    @Get('[:]search')
    @ApiQuery({ name: 'email' })
    async search(@Query('email') email: string): Promise<IdentityState> {
        const user = await this.admin.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException();
        }

        const aggregate = await this.identities.findById(user.id);
        if (aggregate.isNew) {
            throw new NotFoundException();
        } else {
            return aggregate.state;
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id' })
    async get(@Param('id') id: string): Promise<IdentityState> {
        const aggregate = await this.identities.findById(id);

        if (aggregate.isNew) {
            throw new NotFoundException();
        }

        return aggregate.state;
    }
}
