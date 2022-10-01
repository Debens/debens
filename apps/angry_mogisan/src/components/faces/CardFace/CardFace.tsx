import React, { useMemo } from 'react';

import { Grid } from '@training/mobile-atoms/src';

import { SemanticColor } from '../../../../../../packages/theme/src';
import { FaceEmotion } from '../../GameProvider/game-context';
import { useFaceEmotion } from '../../GameProvider/game-hooks';
import { FaceProps } from '../model';
import { withFace } from '../with-face';

const CardFace: React.FunctionComponent<FaceProps> = props => {
    const { x, y } = props;

    const state = useFaceEmotion(x, y);
    const backgroundColor = useMemo<SemanticColor>(() => {
        switch (state) {
            case FaceEmotion.Neutral:
                return '$background-active';
            case FaceEmotion.Calm:
                return '$background-brand';
            case FaceEmotion.Angry:
                return '$button-danger';
        }
    }, [state]);

    return <Grid flex={1} backgroundColor={backgroundColor} margin="small" borderRadius="medium" />;
};

export default withFace(CardFace);
