import { EventSourcingModule } from '@debens/event-sourcing';
import { AuthModule } from '@debens/nestjs-auth';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import identityConfig from '../config/identity.config';

import { CreateIdentityHandler } from './handlers/create-identity.handler';
import { VerifyIdentityHandler } from './handlers/verify-identity.handler';
import { IdentityController } from './identity.controller';
import { IdentityRepository } from './identity.repository';
import { IdentityService } from './services/identity.service';

export const CommandHandlers = [CreateIdentityHandler, VerifyIdentityHandler];
export const EventHandlers = [];

export class IdentityModule {
    static forRoot(): DynamicModule {
        return {
            module: IdentityModule,
            imports: [CqrsModule, AuthModule, EventSourcingModule.forModule()],
            controllers: [IdentityController],
            providers: [...CommandHandlers, ...EventHandlers, IdentityRepository],
        };
    }

    static forModule(): DynamicModule {
        return {
            module: IdentityModule,
            imports: [ConfigModule.forFeature(identityConfig)],
            exports: [IdentityService],
            providers: [IdentityService],
        };
    }
}
