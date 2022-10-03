import React, { useMemo } from 'react';

import { Grid } from '@training/mobile-atoms';
import { SemanticColor } from '@training/theme';

import { FaceEmotion } from '../../GameProvider/game-context';
import { BaseFaceProps } from '../model';

const CardFace: React.FunctionComponent<BaseFaceProps> = props => {
    const { emotion, ...grid } = props;

    const backgroundColor = useMemo<SemanticColor>(() => {
        switch (emotion) {
            case FaceEmotion.Neutral:
                return '$background-active';
            case FaceEmotion.Calm:
                return '$background-brand';
            case FaceEmotion.Angry:
                return '$button-danger';
        }
    }, [emotion]);

    return <Grid flex={1} backgroundColor={backgroundColor} margin="small" borderRadius="medium" {...grid} />;
};

export default CardFace;
