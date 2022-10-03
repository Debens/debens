import React, { memo, useState } from 'react';

import { FaceSource } from '../../face-book/face-book';
import { FacePackType } from '../../face-pack/model';

import context from './face-context';

type FaceProviderProps = React.PropsWithChildren<{
    pack: FacePackType;
    source: FaceSource;
}>;

const FaceProvider: React.FunctionComponent<FaceProviderProps> = props => {
    const { source } = props;
    const [pack, setPack] = useState(props.pack);

    return <context.Provider value={{ pack, setPack, source }}>{props.children}</context.Provider>;
};

export default memo(FaceProvider);
