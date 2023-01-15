import { AccessTokenGuard } from '@debens/nestjs-auth';
import {
    Controller,
    Get,
    Inject,
    NotFoundException,
    Param,
    UseGuards,
} from '@nestjs/common';
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
        const aggregate = await this.identities.findById(id);

        if (aggregate.isNew) {
            throw new NotFoundException();
        }

        return aggregate;
    }
}
