import { EventSourcingModule } from '@debens/event-sourcing';
import { AuthModule } from '@debens/nestjs-auth';
import { IdentityModule } from '@debens/service-identity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreatePersonaHandler } from './handlers/create-persona.handler';
import { PersonaController } from './persona.controller';
import { PersonaFactory } from './persona.factory';
import { PersonaRepository } from './persona.repository';

export const CommandHandlers = [CreatePersonaHandler];
export const EventHandlers = [];

@Module({
    imports: [CqrsModule, AuthModule, EventSourcingModule.forModule(), IdentityModule.forModule()],
    controllers: [PersonaController],
    providers: [...CommandHandlers, ...EventHandlers, PersonaRepository, PersonaFactory],
})
export class PersonaModule {}
