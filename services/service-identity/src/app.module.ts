import { EventSourcingModule } from '@debens/event-sourcing';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import eventstore from './config/eventstore.config';
import rabbitmq from './config/rabbitmq.config';
import { IdentityModule } from './identity/identity.module';
import { WebAuthnModule } from './webauthn/webauthn.module';
import { WellKnownModule } from './well-known/well-known.module';

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true, load: [eventstore, rabbitmq] }),
        IdentityModule,
        WebAuthnModule,
        WellKnownModule,
        EventSourcingModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
