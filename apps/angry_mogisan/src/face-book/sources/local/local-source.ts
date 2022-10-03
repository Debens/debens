import { FaceSource } from '../../face-book';
import { Face } from '../../model';

import { LOCAL_SOURCES } from './local-sources';

const LOCAL_NAMES = Object.keys(LOCAL_SOURCES);

export class LocalSource implements FaceSource {
    getNames(): string[] {
        return LOCAL_NAMES;
    }

    has(name: string): boolean {
        return LOCAL_NAMES.includes(name);
    }

    get(name: string): Face | undefined {
        return LOCAL_SOURCES[name];
    }
}
