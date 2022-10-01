import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Button, ButtonProps, Grid } from '@training/mobile-atoms';

import Face from '../faces/Face/Face';
import { useFinalPosition } from '../GameProvider/game-hooks';

type FinalFaceProps = ButtonProps;

const FinalFace: React.FunctionComponent<FinalFaceProps> = button => {
    const final = useFinalPosition();

    return (
        <Button.Frame style={StyleSheet.absoluteFillObject} position="absolute" {...button}>
            <Grid flex={1} pointerEvents="none">
                <Face pointerEvents="none" x={final[0]} y={final[1]} enterDuration={0} staggered={false} />
            </Grid>
        </Button.Frame>
    );
};

export default memo(FinalFace);
