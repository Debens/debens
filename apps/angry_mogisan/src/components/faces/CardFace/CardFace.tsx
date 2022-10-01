import React, { useMemo } from 'react';

import { Grid } from '@training/mobile-atoms/src';

import { SemanticColor } from '../../../../../../packages/theme/src';
import { FaceEmotion } from '../../GameProvider/game-context';
import { FaceProps } from '../model';

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
