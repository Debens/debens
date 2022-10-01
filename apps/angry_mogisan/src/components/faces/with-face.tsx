import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SlideInUp, SlideOutUp } from 'react-native-reanimated';

import { Button, EASING, Grid } from '@training/mobile-atoms';

import { COLUMN_COUNT, FaceEmotion, ROW_COUNT } from '../GameProvider/game-context';
import { useFaceEmotion, useSelectHandler } from '../GameProvider/game-hooks';

import { FaceProps } from './Face/Face';

const easing = EASING.deceleration.factory();

const onExit = SlideOutUp.duration(2000).easing(easing);
const useOnEnter = (x: number, y: number) =>
    useMemo(() => {
        return SlideInUp.duration(400)
            .easing(easing)
            .delay((ROW_COUNT - x) * 100 + (COLUMN_COUNT - y) * 100);
    }, [x, y]);

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
                case FaceEmotion.Calm:
                    return setIsHidden(true);
                case FaceEmotion.Angry:
                case FaceEmotion.Neutral:
                    return setIsHidden(false);
            }
        }, [emotion]);

        const onEnter = useOnEnter(x, y);

        return (
            <Button.Frame overflow="visible" flex={1} onPress={onPress}>
                {!isHidden && (
                    <Grid.Animated flex={1} exiting={onExit} entering={onEnter}>
                        <Component {...props} />
                    </Grid.Animated>
                )}
            </Button.Frame>
        );
    };

    Wrapped.displayName = `withGame(${Component.displayName})`;

    return memo(Wrapped);
};
