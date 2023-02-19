import { EventSourcingModule } from '@debens/event-sourcing';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClsModule } from 'nestjs-cls';

import eventstore from './config/eventstore.config';
import rabbitmq from './config/rabbitmq.config';
import { IdentityModule } from './identity/identity.module';

@Module({
    imports: [
        ClsModule.forRoot({ middleware: { mount: true } }),
        ConfigModule.forRoot({ cache: true, load: [eventstore, rabbitmq] }),
        IdentityModule.forRoot(),
        EventSourcingModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
