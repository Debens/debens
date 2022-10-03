import { Face } from './model';

export interface FaceSource {
    getNames(): string[];

    has(name: string): boolean;

    get(name: string): Face | undefined;
}

interface FaceBookParams {
    sources: FaceSource[];
}

export class FaceBook implements FaceSource {
    private readonly sources: FaceSource[];

    constructor(params: FaceBookParams) {
        this.sources = params.sources;
    }

    getNames(): string[] {
        return this.sources.map(source => source.getNames()).flat();
    }

    has(name: string): boolean {
        return !!this.sources.find(source => source.has(name));
    }

    get(name: string): Face | undefined {
        return this.sources.find(source => source.has(name))?.get(name);
    }
}
