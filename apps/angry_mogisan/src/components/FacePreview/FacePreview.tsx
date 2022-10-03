import React, { memo } from 'react';

import { Grid, GridProps, Paragraph, ThematicBreak } from '@training/mobile-atoms';

import { Face } from '../../face-book/model';
import FaceFacade from '../faces/FaceFacade/FaceFacade';
import { FaceEmotion } from '../GameProvider/game-context';

interface FacePreviewProps extends GridProps {
    name: string;
    source: Face;
}

const FacePreview: React.FunctionComponent<FacePreviewProps> = props => {
    const { name, source, ...grid } = props;
    return (
        <Grid borderRadius="medium" {...grid}>
            <Grid p="small" flex={1}>
                <FaceFacade {...source} resizeMode="contain" emotion={FaceEmotion.Neutral} />
            </Grid>
            <ThematicBreak pY="small" color="$background-primary" />
            <Paragraph p="small" textAlign="center">
                {name}
            </Paragraph>
        </Grid>
    );
};

export default memo(FacePreview);
