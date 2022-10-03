import React, { memo } from 'react';

import { Face, FaceType } from '../../../face-book/model';
import ComponentFace from '../ComponentFace/ComponentFace';
import ImageFace from '../ImageFace/ImageFace';
import { BaseFaceProps } from '../model';

type FaceFacadeProps = Face & BaseFaceProps;

const FaceFacade: React.FunctionComponent<FaceFacadeProps> = props => {
    const { type, ...face } = props;

    switch (type) {
        case FaceType.Component:
            return <ComponentFace {...face} />;
        case FaceType.Image:
            return <ImageFace {...face} />;
    }
};

export default memo(FaceFacade);
