import { StorableEvent } from '@debens/event-sourcing';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { EventStreams } from './event-streams';

@ApiTags('Events')
@Controller('events')
export class StreamController {
    @Inject(EventStreams)
    private readonly streams!: EventStreams;

    @Get(':aggregate/:id')
    @ApiParam({ name: 'aggregate' })
    async get(@Param('aggregate') aggregate: string, @Param('id') id: string): Promise<Array<StorableEvent>> {
        const events = [];
        for await (const event of this.streams.read(aggregate, id)) {
            events.push(event);
        }
        return events;
    }
}
