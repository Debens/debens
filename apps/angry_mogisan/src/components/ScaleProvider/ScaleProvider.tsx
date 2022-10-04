import React, { memo, useState } from 'react';

import context from './scale-context';

export const DEFAULT_SCALING = 128;

type ScaleProviderProps = React.PropsWithChildren<{
    scale?: number;
}>;

const ScaleProvider: React.FunctionComponent<ScaleProviderProps> = props => {
    const { scale: initial = DEFAULT_SCALING } = props;
    const [scale] = useState(initial);

    return <context.Provider value={{ scaling: scale }}>{props.children}</context.Provider>;
};

export default memo(ScaleProvider);
