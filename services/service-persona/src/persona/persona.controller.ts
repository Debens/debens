import { AccessTokenGuard } from '@debens/nestjs-auth';
import {
    Body,
    Controller,
    Get,
    Inject,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePersona } from './commands/create-persona.command';
import { PersonaState } from './persona.aggregate';
import { PersonaRepository } from './persona.repository';
import { CreatePersonaDTO } from './requests/create-persona.dto';

@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
    @Inject(CommandBus)
    private readonly commandBus!: CommandBus;

    @Inject(PersonaRepository)
    private readonly personas!: PersonaRepository;

    @Post()
    @ApiResponse({ type: 'PersonaState' })
    async create(@Body() dto: CreatePersonaDTO): Promise<PersonaState> {
        return await this.commandBus.execute(new CreatePersona(dto));
    }

    @Get(':id')
    @ApiParam({ name: 'id' })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async get(@Param('id') id: string): Promise<PersonaState> {
        const aggregate = await this.personas.findById(id);

        if (aggregate.isNew) {
            throw new NotFoundException();
        }

        return aggregate.state;
    }
}
