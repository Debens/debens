import { EventSourcingModule } from '@debens/event-sourcing';
import { AuthModule } from '@debens/nestjs-auth';
import { DynamicModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { HankoModule } from '../hanko/hanko.module';

import { DeviceController } from './controllers/device.controller';
import { EmailController } from './controllers/email.controller';
import { IdentityController } from './controllers/identity.controller';
import { ChallengeIdentityHandler } from './handlers/challenge-identity.handler';
import { CreateIdentityHandler } from './handlers/create-identity.handler';
import { FinalizeCredentialsHandler } from './handlers/finalize-credentials.handler';
import { RegisterCredentialsHandler } from './handlers/register-credentials.handler';
import { VerifyIdentityHandler } from './handlers/verify-identity.handler';
import { IdentityFactory } from './identity.factory';
import { IdentityRepository } from './identity.repository';

export const CommandHandlers = [
    CreateIdentityHandler,
    ChallengeIdentityHandler,
    VerifyIdentityHandler,
    RegisterCredentialsHandler,
    FinalizeCredentialsHandler,
];

export const EventHandlers = [];

export class IdentityModule {
    static forRoot(): DynamicModule {
        return {
            module: IdentityModule,
            imports: [CqrsModule, AuthModule, EventSourcingModule.forModule(), HankoModule],
            controllers: [IdentityController, EmailController, DeviceController],
            providers: [...CommandHandlers, ...EventHandlers, IdentityFactory, IdentityRepository],
        };
    }
}
