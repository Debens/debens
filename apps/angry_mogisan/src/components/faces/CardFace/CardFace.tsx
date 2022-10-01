import React, { useMemo } from 'react';

import { Grid } from '@training/mobile-atoms/src';

import { SemanticColor } from '../../../../../../packages/theme/src';
import { FaceState, useFaceState } from '../../GameProvider/GameProvider';
import { FaceProps } from '../model';
import { withFace } from '../with-face';

const CardFace: React.FunctionComponent<FaceProps> = props => {
    const { x, y } = props;

    const state = useFaceState(x, y);
    const backgroundColor = useMemo<SemanticColor>(() => {
        switch (state) {
            case FaceState.Normal:
                return '$background-active';
            case FaceState.Calm:
                return '$background-brand';
            case FaceState.Angry:
                return '$button-danger';
        }
    }, [state]);

    return <Grid flex={1} backgroundColor={backgroundColor} margin="small" borderRadius="medium" />;
};

export default withFace(CardFace);
