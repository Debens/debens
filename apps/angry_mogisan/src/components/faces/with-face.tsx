import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SlideInUp, SlideOutUp } from 'react-native-reanimated';

import { Button, EASING, Grid } from '@training/mobile-atoms';

import { COLUMN_COUNT, FaceEmotion, ROW_COUNT } from '../GameProvider/game-context';
import { useFaceEmotion, useSelectHandler } from '../GameProvider/game-hooks';

import { FaceProps } from './Face/Face';

const easing = EASING.deceleration.factory();

const useOnExit = (duration = 2000) =>
    useMemo(() => SlideOutUp.duration(duration).easing(easing), [duration]);
const useOnEnter = (x: number, y: number, { duration = 400, staggered = true }) =>
    useMemo(() => {
        return staggered
            ? SlideInUp.duration(duration)
                  .easing(easing)
                  .delay((ROW_COUNT - x) * 100 + (COLUMN_COUNT - y) * 100)
            : SlideInUp.duration(duration).easing(easing);
    }, [x, y, duration, staggered]);

type WithFaceConfig<P> = P & {
    exitDuration?: number;
    enterDuration?: number;
    staggered?: boolean;
};

export const withFace = <P extends FaceProps>(Component: React.ComponentType<P>) => {
    const Wrapped = (props: WithFaceConfig<P>) => {
        const { x, y, exitDuration, enterDuration, staggered } = props;

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

        const onEnter = useOnEnter(x, y, { duration: enterDuration, staggered });
        const onExit = useOnExit(exitDuration);

        return (
            <Button.Frame overflow="visible" flex={1} onPress={onPress}>
                <Grid.Animated flex={1} key={isHidden.toString()} exiting={onExit} entering={onEnter}>
                    {!isHidden && <Component {...props} />}
                </Grid.Animated>
            </Button.Frame>
        );
    };

    Wrapped.displayName = `withGame(${Component.displayName})`;

    return memo(Wrapped);
};
