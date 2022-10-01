import React, { createContext, memo, useContext, useState } from 'react';

import { FacePack } from '../faces/model';

interface FaceState {
    pack: FacePack;
    setPack: (pack: FacePack) => void;
}

const noop = () => void 0;
const context = createContext<FaceState>({
    pack: FacePack.Debug,
    setPack: noop,
});

export const useFacePack = () => {
    const { pack, setPack } = useContext(context);

    return [pack, setPack] as const;
};

type FaceProviderProps = React.PropsWithChildren<{ pack: FacePack }>;

const FaceProvider: React.FunctionComponent<FaceProviderProps> = props => {
    const [pack, setPack] = useState(props.pack);

    return <context.Provider value={{ pack, setPack }}>{props.children}</context.Provider>;
};

export default memo(FaceProvider);
