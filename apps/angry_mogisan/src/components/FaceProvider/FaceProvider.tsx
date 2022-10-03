import React, { memo, useState } from 'react';

import { FacePackType } from '../../face-pack/model';

import context, { DEFAULT_SCALING } from './face-context';

type FaceProviderProps = React.PropsWithChildren<{ pack: FacePackType; scale?: number }>;

const FaceProvider: React.FunctionComponent<FaceProviderProps> = props => {
    const { scale: initialScale = DEFAULT_SCALING } = props;
    const [pack, setPack] = useState(props.pack);
    const [scale] = useState(initialScale);

    return <context.Provider value={{ pack, setPack, scaling: scale }}>{props.children}</context.Provider>;
};

export default memo(FaceProvider);
