import React, { memo } from 'react';

import { FaceEmotion } from '../../GameProvider/game-context';
import CardFace from '../CardFace/CardFace';
import DebugFace from '../DebugFace/DebugFace';
import { FacePack } from '../model';
import MorganFace from '../MorganFace/MorganFace';
import TazFace from '../TazFace/TazFace';

interface FaceFacadeProps {
    pack: FacePack;
    emotion: FaceEmotion;
}

const FaceFacade: React.FunctionComponent<FaceFacadeProps> = props => {
    const { pack, emotion, ...grid } = props;

    switch (pack) {
        case FacePack.Debug:
            return <DebugFace emotion={emotion} {...grid} />;
        case FacePack.Card:
            return <CardFace emotion={emotion} {...grid} />;
        case FacePack.Morgan:
            return <MorganFace emotion={emotion} {...grid} />;
        case FacePack.Taz:
            return <TazFace emotion={emotion} {...grid} />;
    }
};

export default memo(FaceFacade);
