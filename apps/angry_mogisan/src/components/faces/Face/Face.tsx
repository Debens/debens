import React from 'react';

import { GridProps } from '@training/mobile-atoms';

import { useFaceProfile, useFaceScale } from '../../FaceProvider/face-hooks';
import { useFaceEmotion } from '../../GameProvider/game-hooks';
import FaceFacade from '../FaceFacade/FaceFacade';
import { withFace } from '../with-face';

export interface FaceProps extends GridProps {
    x: number;
    y: number;
}

const Face: React.FunctionComponent<FaceProps> = props => {
    const { x, y, ...grid } = props;

    const emotion = useFaceEmotion(x, y);

    const profile = useFaceProfile();
    const scale = useFaceScale();

    return <FaceFacade profile={profile} emotion={emotion} scaling={scale} {...grid} />;
};

export default withFace(Face);
