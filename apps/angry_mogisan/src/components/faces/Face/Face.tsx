import React, { memo } from 'react';

import { useFacePack } from '../../FaceProvider/FaceProvider';
import CardFace from '../CardFace/CardFace';
import DebugFace from '../DebugFace/DebugFace';
import { FacePack, FaceProps } from '../model';
import MorganFace from '../MorganFace/MorganFace';

const Face: React.FunctionComponent<FaceProps> = props => {
    const pack = useFacePack();

    switch (pack) {
        case FacePack.Debug:
            return <DebugFace {...props} />;
        case FacePack.Card:
            return <CardFace {...props} />;
        case FacePack.Morgan:
            return <MorganFace {...props} />;
    }
};

export default memo(Face);
