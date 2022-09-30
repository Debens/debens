import { EventStoreDBClient } from '@eventstore/db-client';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { Config, EventStoreConfig } from './config';
import { EventStore } from './event-store';
import { EventStoreBus } from './event-store-bus';
import { EventStorePublisher } from './event-store-publisher';
import { EventStreams } from './event-streams';

export class EventSourcingModule {
    static forRoot(): DynamicModule {
        return {
            module: EventSourcingModule,
            providers: [
                {
                    provide: EventStoreDBClient,
                    inject: [ConfigService],
                    async useFactory(config: ConfigService<Config>) {
                        await ConfigModule.envVariablesLoaded;
                        const eventstore = config.get<EventStoreConfig>('eventstore');
                        return new EventStoreDBClient(
                            { endpoint: `${eventstore?.host}:${eventstore?.port}` },
                            { insecure: eventstore?.insecure },
                        );
                    },
                },
            ],
            imports: [ConfigModule],
            exports: [EventStoreDBClient],
            global: true,
        };
    }

    static forModule(): DynamicModule {
        return {
            module: EventSourcingModule,
            providers: [EventStore, EventStoreBus, EventStorePublisher, EventStreams],
            imports: [CqrsModule],
            exports: [EventStorePublisher, EventStreams],
        };
    }
}
