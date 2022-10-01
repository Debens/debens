import React from 'react';

import { Grid, Paragraph } from '@training/mobile-atoms/src';

import { FaceProps } from '../model';

const MorganFace: React.FunctionComponent<FaceProps> = props => {
    const { emotion } = props;

    return (
        <Grid flex={1} margin="small" borderRadius="medium">
            <Paragraph textAlgin="center">Morgan is {emotion}</Paragraph>
        </Grid>
    );
};

export default MorganFace;
