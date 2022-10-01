import React, { memo, useState } from 'react';

import { FacePackType } from '../../face-pack/model';

import context from './face-context';

type FaceProviderProps = React.PropsWithChildren<{ pack: FacePackType }>;

const FaceProvider: React.FunctionComponent<FaceProviderProps> = props => {
    const [pack, setPack] = useState(props.pack);

    return <context.Provider value={{ pack, setPack }}>{props.children}</context.Provider>;
};

export default memo(FaceProvider);
