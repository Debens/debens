import React, { useMemo } from 'react';

import { Grid } from '@training/mobile-atoms';
import { SemanticColor } from '@training/theme';

import { FaceProps } from '../../../face-book/model';
import { FaceEmotion } from '../../GameProvider/game-context';

const CardFace: React.FunctionComponent<FaceProps> = props => {
    const { emotion } = props;

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

    return <Grid flex={1} backgroundColor={backgroundColor} margin="small" borderRadius="medium" />;
};

export default CardFace;
