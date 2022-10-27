import React, { memo, useCallback, useState } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';

import { Button, ButtonProps, Grid } from '@debens/mobile-atoms';

import Face from '../faces/Face/Face';
import { useFinalPosition } from '../GameProvider/game-hooks';

type FinalFaceProps = ButtonProps;

const FinalFace: React.FunctionComponent<FinalFaceProps> = button => {
    const { onPress } = button;
    const final = useFinalPosition();

    const position = { x: final[0], y: final[1] };

    const [count, setCount] = useState(0);
    const onDoublePress = useCallback(
        (event: GestureResponderEvent) => {
            if (count >= 1) {
                onPress?.(event);
            } else {
                setCount(count => count + 1);
            }
        },
        [onPress, count],
    );

    return (
        <Button.Frame style={StyleSheet.absoluteFill} position="absolute" {...button} onPress={onDoublePress}>
            <Grid flex={1} pointerEvents="none">
                <Face flex={1} {...position} enterDuration={0} staggered={false} />
            </Grid>
        </Button.Frame>
    );
};

export default memo(FinalFace);
