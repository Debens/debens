import { ReactTestInstance } from 'react-test-renderer';

import getByPercentage from './get-by-percentage/get-by-percentage';

export namespace Query {
    export const DEFAULT_QUERIES = [getByPercentage];

    export type Builders = typeof getByPercentage;
    export const builders = DEFAULT_QUERIES.reduce((a, b) => Object.assign(a, b), {} as Builders);

    export type Extension = { [k in keyof Testing.Queries]?: Testing.Queries[k] };
    export const extend = (extension: Extension) => Object.assign(builders, extension);

    export type FromBuilder<Builder> = Builder extends (instance: ReactTestInstance) => infer Query
        ? Query
        : never;
    export type FromBuilders<Builders> = { [k in keyof Builders]: FromBuilder<Builders[k]> };
}

declare global {
    namespace Testing {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        export interface Queries extends Query.FromBuilders<Query.Builders> {}
    }
}
