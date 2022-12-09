import { JSONType } from '@eventstore/db-client';
import { IEvent } from '@nestjs/cqrs';

type Maybe<T> = Partial<T> | undefined | null;

export abstract class StorableEvent<Data extends JSONType = JSONType> {
    abstract readonly data: Data;

    readonly type: string = this.constructor.name;

    readonly stream: string;

    readonly metadata = { timestamp: new Date() };

    constructor(public readonly id: string, public readonly aggregate: string) {
        this.stream = `${aggregate}-${id}`;
    }

    static isStorable<T extends JSONType = JSONType>(event: IEvent): event is StorableEvent<T> {
        const candidate = event as Maybe<StorableEvent>;
        return !!candidate?.stream;
    }
}
