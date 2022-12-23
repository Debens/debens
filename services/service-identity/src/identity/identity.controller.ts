import { AccessTokenGuard } from '@debens/nestjs-auth';
import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { IdentityAggregate } from './identity.aggregate';
import { IdentityRepository } from './identity.repository';

@ApiTags('Identity')
@Controller('identity')
export class IdentityController {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Get(':id')
    @ApiParam({ name: 'id' })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async get(@Param('id') id: string): Promise<IdentityAggregate> {
        return await this.identities.findById(id);
    }
}
