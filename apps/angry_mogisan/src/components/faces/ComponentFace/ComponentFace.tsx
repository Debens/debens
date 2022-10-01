import React, { memo } from 'react';

import { ComponentisedProfile } from '../../../face-book/componentised/model';
import { ComponentFace } from '../../../face-pack/model';
import CardFace from '../CardFace/CardFace';
import DebugFace from '../DebugFace/DebugFace';
import { FaceProps } from '../model';

interface ComponentFaceProps extends FaceProps {
    profile: ComponentFace;
}

const ComponentFace: React.FunctionComponent<ComponentFaceProps> = props => {
    const { profile, emotion, ...grid } = props;

    switch (profile.name) {
        case ComponentisedProfile.Card:
            return <CardFace emotion={emotion} {...grid} />;
        case ComponentisedProfile.Debug:
            return <DebugFace emotion={emotion} {...grid} />;
    }
};

export default memo(ComponentFace);
