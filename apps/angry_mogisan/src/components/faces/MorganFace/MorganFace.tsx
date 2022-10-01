import React from 'react';

import { Grid, Paragraph } from '@training/mobile-atoms/src';

import { useFaceEmotion } from '../../GameProvider/game-hooks';
import { FaceProps } from '../model';
import { withFace } from '../with-face';

const MorganFace: React.FunctionComponent<FaceProps> = props => {
    const { x, y } = props;

    const state = useFaceEmotion(x, y);

    return (
        <Grid flex={1} margin="small" borderRadius="medium">
            <Paragraph textAlgin="center">Morgan is {state}</Paragraph>
        </Grid>
    );
};

export default withFace(MorganFace);
