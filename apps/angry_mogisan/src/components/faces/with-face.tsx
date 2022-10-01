import React, { memo, useCallback } from 'react';

import { Button } from '@training/mobile-atoms';

import { useSelectHandler } from '../GameProvider/GameProvider';

import { FaceProps } from './model';

export const withFace = <P extends FaceProps>(Component: React.ComponentType<P>) => {
    const Wrapped = (props: P) => {
        const { x, y } = props;

        const onSelect = useSelectHandler();

        const onPress = useCallback(() => {
            onSelect(x, y);
        }, [onSelect, x, y]);

        return (
            <Button.Frame flex={1} onPress={onPress}>
                <Component {...props} />
            </Button.Frame>
        );
    };

    Wrapped.displayName = `withGame(${Component.displayName})`;

    return memo(Wrapped);
};
