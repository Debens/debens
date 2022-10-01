import React, { useMemo } from 'react';

import { Button, Grid, Paragraph } from '@training/mobile-atoms';
import { TypographyToken } from '@training/theme';

import { FaceEmotion } from '../../GameProvider/game-context';
import { FaceProps } from '../model';
import { withFace } from '../with-face';

interface DebugFace extends FaceProps, React.ComponentProps<typeof Button.Frame> {}

const DebugFace: React.FunctionComponent<DebugFace> = props => {
    const { emotion } = props;

    const typeset = useMemo<`${TypographyToken}`>(() => {
        switch (emotion) {
            case FaceEmotion.Calm:
            case FaceEmotion.Neutral:
                return '$body';
            case FaceEmotion.Angry:
                return '$heading';
        }
    }, [emotion]);

    return (
        <Grid flex={1} variant="center">
            <Paragraph typeset={typeset} textAlign="center">
                {emotion}
            </Paragraph>
        </Grid>
    );
};

export default DebugFace;
