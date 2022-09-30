import { IEvent } from '@nestjs/cqrs';

export interface IAggregate {
    version: number;
    isNew: boolean;
    uncommited: IEvent[];

    raise(event: IEvent): void;
    apply(event: IEvent): void;
}

export abstract class Aggregate implements IAggregate {
    #history: IEvent[] = [];
    #changes: IEvent[] = [];

    #version: number = 0;

    get version(): number {
        return this.#version;
    }

    get isNew(): boolean {
        return !this.#history.length;
    }

    get history(): IEvent[] {
        return this.#history;
    }

    get uncommited(): IEvent[] {
        return this.#changes;
    }

    raise = (event: IEvent) => this.apply(event, true);

    apply = (event: IEvent, isHistoric?: boolean) => {
        this.handle(event);
        isHistoric ? this.#history.push(event) : this.#changes.push(event);
        this.#version++;
    };

    private handle(event: IEvent) {
        const { constructor } = Object.getPrototypeOf(event);
        // @ts-ignore
        this[`on${constructor.name}`]?.(event);
    }
}
