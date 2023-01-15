import { EventSourcingModule } from '@debens/event-sourcing';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import eventstore from './config/eventstore.config';
import rabbitmq from './config/rabbitmq.config';
import { PersonaModule } from './persona/persona.module';

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true, load: [eventstore, rabbitmq] }),
        EventSourcingModule.forRoot(),
        PersonaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
