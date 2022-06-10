import { HTTPClient } from './http-client';
import { modules as m } from './modules';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace http {
    export const client = new HTTPClient();

    export const modules = m;
}
