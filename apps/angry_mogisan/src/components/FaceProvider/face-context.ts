import { createContext } from 'react';

import { FacePackType } from '../../face-pack/model';

export interface FaceState {
    pack: FacePackType;
    setPack: (pack: FacePackType) => void;
}

const noop = () => void 0;
export const context = createContext<FaceState>({
    pack: FacePackType.Debug,
    setPack: noop,
});

export default context;
