import React, { useMemo } from 'react';

import { Grid, GridProps } from '@training/mobile-atoms';

import { useRandomGameFace } from '../../FaceProvider/face-hooks';
import { useFaceEmotion } from '../../GameProvider/game-hooks';
import { useFaceScale } from '../../ScaleProvider/scale-hooks';
import FaceFacade from '../FaceFacade/FaceFacade';
import { withFace } from '../with-face';

export interface FaceProps extends GridProps {
    x: number;
    y: number;
}

const Face: React.FunctionComponent<FaceProps> = props => {
    const { x, y, ...grid } = props;

    const emotion = useFaceEmotion(x, y);

    const profile = useRandomGameFace();
    const scale = useFaceScale();

    const size = useMemo(() => (scale ? { height: `${scale}%`, width: `${scale}%` } : undefined), [scale]);

    return profile ? (
        <Grid variant="center" position="relative" flex={1}>
            <Grid position="absolute" style={size}>
                <FaceFacade {...profile} emotion={emotion} scaling={scale} {...grid} />
            </Grid>
        </Grid>
    ) : null;
};

export default withFace(Face);
