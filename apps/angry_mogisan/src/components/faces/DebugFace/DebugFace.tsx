import React from 'react';

import { Button, Grid, Paragraph } from '@training/mobile-atoms';

import { useFace } from '../../GameProvider/game-hooks';
import { FaceProps } from '../model';
import { withFace } from '../with-face';

interface DebugFace extends FaceProps, React.ComponentProps<typeof Button.Frame> {
    x: number;
    y: number;
}

const DebugFace: React.FunctionComponent<DebugFace> = props => {
    const { x, y } = props;

    const selected = useFace(x, y);

    return (
        <Grid flex={1} variant="center">
            <Paragraph typeset={selected ? '$heading' : '$body'} textAlign="center">
                {selected?.toString()}
            </Paragraph>
        </Grid>
    );
};

export default withFace(DebugFace);
