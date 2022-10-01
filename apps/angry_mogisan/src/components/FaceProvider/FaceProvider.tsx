import React, { createContext, memo, useContext, useState } from 'react';

import { FacePack } from '../faces/model';

interface FaceState {
    pack: FacePack;
}

const context = createContext<FaceState>({
    pack: FacePack.Debug,
});

export const useFacePack = () => useContext(context).pack;

type FaceProviderProps = React.PropsWithChildren<{ pack: FacePack }>;

const FaceProvider: React.FunctionComponent<FaceProviderProps> = props => {
    const [pack] = useState(props.pack);

    return <context.Provider value={{ pack }}>{props.children}</context.Provider>;
};

export default memo(FaceProvider);
