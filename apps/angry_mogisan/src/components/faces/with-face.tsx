import React, { memo, useCallback, useEffect, useState } from 'react';
import { SlideOutUp } from 'react-native-reanimated';

import { Button, EASING, Grid } from '@training/mobile-atoms';

import { FaceEmotion } from '../GameProvider/game-context';
import { useFaceEmotion, useSelectHandler } from '../GameProvider/game-hooks';

import { FaceProps } from './model';

const easing = EASING.deceleration.factory();

export const withFace = <P extends FaceProps>(Component: React.ComponentType<P>) => {
    const Wrapped = (props: P) => {
        const { x, y } = props;

        const onSelect = useSelectHandler();

        const onPress = useCallback(() => {
            onSelect(x, y);
        }, [onSelect, x, y]);

        const emotion = useFaceEmotion(x, y);
        const [isHidden, setIsHidden] = useState(false);
        /* deferred not next fibre to allow for face change */
        useEffect(() => {
            switch (emotion) {
                case FaceEmotion.Angry:
                case FaceEmotion.Calm:
                    return setIsHidden(true);
                case FaceEmotion.Neutral:
                    return setIsHidden(false);
            }
        }, [emotion]);

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
