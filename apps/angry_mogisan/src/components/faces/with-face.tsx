import React, { memo, useCallback, useEffect, useState } from 'react';
import { SlideOutUp } from 'react-native-reanimated';

import { Button, EASING, Grid } from '@training/mobile-atoms';

import { FaceState, useFaceState, useSelectHandler } from '../GameProvider/GameProvider';

import { FaceProps } from './model';

const easing = EASING.deceleration.factory();

export const withFace = <P extends FaceProps>(Component: React.ComponentType<P>) => {
    const Wrapped = (props: P) => {
        const { x, y } = props;

        const onSelect = useSelectHandler();

        const onPress = useCallback(() => {
            onSelect(x, y);
        }, [onSelect, x, y]);

        const state = useFaceState(x, y);
        const [isHidden, setIsHidden] = useState(false);
        /* deferred not next fibre to allow for face change */
        useEffect(() => {
            switch (state) {
                case FaceState.Angry:
                case FaceState.Calm:
                    return setIsHidden(true);
                case FaceState.Normal:
                    return setIsHidden(false);
            }
        }, [state]);

        return (
            <Button.Frame overflow="visible" flex={1} onPress={onPress}>
                {!isHidden && (
                    <Grid.Animated flex={1} exiting={SlideOutUp.duration(2000).easing(easing)}>
                        <Component {...props} />
                    </Grid.Animated>
                )}
            </Button.Frame>
        );
    };

    Wrapped.displayName = `withGame(${Component.displayName})`;

    return memo(Wrapped);
};
