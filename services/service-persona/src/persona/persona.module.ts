import { EventSourcingModule } from '@debens/event-sourcing';
import { AuthModule, User } from '@debens/nestjs-auth';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ClsModule } from 'nestjs-cls';

import { CreatePersonaHandler } from './handlers/create-persona.handler';
import { PersonaController } from './persona.controller';
import { PersonaFactory } from './persona.factory';
import { PersonaRepository } from './persona.repository';

export const CommandHandlers = [CreatePersonaHandler];
export const EventHandlers = [];

@Module({
    imports: [ClsModule.forFeature(User), CqrsModule, AuthModule, EventSourcingModule.forModule()],
    controllers: [PersonaController],
    providers: [...CommandHandlers, ...EventHandlers, PersonaRepository, PersonaFactory],
})
export class PersonaModule {}
