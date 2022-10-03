import { createContext } from 'react';

import { FaceBook, FaceSource } from '../../face-book/face-book';
import { FacePackType } from '../../face-pack/model';

export const DEFAULT_SCALING = 138;

export interface FaceState {
    pack: FacePackType;
    setPack: (pack: FacePackType) => void;
    source: FaceSource;
    scaling: number;
}

const noop = () => void 0;
export const context = createContext<FaceState>({
    pack: FacePackType.Debug,
    setPack: noop,
    source: new FaceBook({ sources: [] }),
    scaling: DEFAULT_SCALING,
});

export default context;
