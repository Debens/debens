import { EventSourcingModule } from '@debens/event-sourcing';
import { AuthModule } from '@debens/nestjs-auth';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateIdentityHandler } from './handlers/create-identity.handler';
import { VerifyIdentityHandler } from './handlers/verify-identity.handler';
import { IdentityController } from './identity.controller';
import { IdentityRepository } from './identity.repository';

export const CommandHandlers = [CreateIdentityHandler, VerifyIdentityHandler];
export const EventHandlers = [];

@Module({
    imports: [CqrsModule, AuthModule, EventSourcingModule.forModule()],
    controllers: [IdentityController],
    providers: [...CommandHandlers, ...EventHandlers, IdentityRepository],
})
export class IdentityModule {}
