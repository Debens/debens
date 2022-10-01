import React, { memo } from 'react';

import { FaceType, Profile } from '../../../face-pack/model';
import { FaceEmotion } from '../../GameProvider/game-context';
import BundledFace from '../BundledFace/BundledFace';
import ComponentFace from '../ComponentFace/ComponentFace';

interface FaceFacadeProps {
    profile: Profile;
    emotion: FaceEmotion;
}

const FaceFacade: React.FunctionComponent<FaceFacadeProps> = props => {
    const { profile, emotion, ...grid } = props;

    switch (profile.type) {
        case FaceType.Component:
            return <ComponentFace profile={profile} emotion={emotion} {...grid} />;
        case FaceType.Bundled:
            return <BundledFace profile={profile} emotion={emotion} {...grid} />;
    }
};

export default memo(FaceFacade);
