import React, { useMemo } from 'react';

import { Grid, Paragraph } from '@debens/mobile-atoms';
import { TypographyToken } from '@debens/theme';

import { FaceEmotion } from '../../GameProvider/game-context';
import { BaseFaceProps } from '../model';

const DebugFace: React.FunctionComponent<BaseFaceProps> = props => {
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
