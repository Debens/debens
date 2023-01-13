import React, { memo } from 'react';

import { ComponentFaceDef, ComponentProfileName } from '../../../face-book/model';
import CardFace from '../CardFace/CardFace';
import DebugFace from '../DebugFace/DebugFace';
import { BaseFaceProps } from '../model';

interface ComponentFaceProps extends ComponentFaceDef, BaseFaceProps {}

const ComponentFace: React.FunctionComponent<ComponentFaceProps> = props => {
    const { component, emotion, ...grid } = props;

    switch (component) {
        case ComponentProfileName.Card:
            return <CardFace emotion={emotion} {...grid} />;
        case ComponentProfileName.Debug:
            return <DebugFace emotion={emotion} {...grid} />;
    }
};

export default memo(ComponentFace);
