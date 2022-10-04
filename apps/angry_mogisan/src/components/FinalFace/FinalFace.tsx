import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Button, ButtonProps, Grid } from '@training/mobile-atoms';

import Face from '../faces/Face/Face';
import { useFinalPosition } from '../GameProvider/game-hooks';

type FinalFaceProps = ButtonProps;

const FinalFace: React.FunctionComponent<FinalFaceProps> = button => {
    const final = useFinalPosition();

    const position = { x: final[0], y: final[1] };

    return (
        <Button.Frame style={StyleSheet.absoluteFill} position="absolute" {...button}>
            <Grid flex={1} pointerEvents="none">
                <Face flex={1} {...position} enterDuration={0} staggered={false} />
            </Grid>
        </Button.Frame>
    );
};

export default memo(FinalFace);
