import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Grid, GridProps } from '@debens/mobile-atoms';

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

    return profile ? <FaceFacade {...profile} emotion={emotion} scaling={scale} {...grid} /> : null;
};

Face.defaultProps = { scale: 100 };

export default withFace(Face);
