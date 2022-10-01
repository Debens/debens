import React, { memo } from 'react';

import { FaceEmotion } from '../../GameProvider/game-context';
import CardFace from '../CardFace/CardFace';
import DebugFace from '../DebugFace/DebugFace';
import { FacePack } from '../model';
import MorganFace from '../MorganFace/MorganFace';

interface FaceFacadeProps {
    pack: FacePack;
    emotion: FaceEmotion;
}

const FaceFacade: React.FunctionComponent<FaceFacadeProps> = props => {
    const { pack, emotion } = props;

    switch (pack) {
        case FacePack.Debug:
            return <DebugFace emotion={emotion} />;
        case FacePack.Card:
            return <CardFace emotion={emotion} />;
        case FacePack.Morgan:
            return <MorganFace emotion={emotion} />;
    }
};

export default memo(FaceFacade);
