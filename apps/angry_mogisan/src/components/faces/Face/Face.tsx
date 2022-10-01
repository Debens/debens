import React from 'react';

import { GridProps } from '@training/mobile-atoms';

import { useFacePack } from '../../FaceProvider/FaceProvider';
import { useFaceEmotion } from '../../GameProvider/game-hooks';
import FaceFacade from '../FaceFacade/FaceFacade';
import { withFace } from '../with-face';

export interface FaceProps extends GridProps {
    x: number;
    y: number;
}

const Face: React.FunctionComponent<FaceProps> = props => {
    const { x, y, ...grid } = props;
    const [pack] = useFacePack();

    const emotion = useFaceEmotion(x, y);

    return <FaceFacade pack={pack} emotion={emotion} {...grid} />;
};

export default withFace(Face);
