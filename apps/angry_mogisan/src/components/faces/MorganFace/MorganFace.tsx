import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

import { Grid } from '@training/mobile-atoms/src';

import { FaceEmotion } from '../../GameProvider/game-context';
import { FaceProps } from '../model';

const FACE_SOURCES: Record<FaceEmotion, ImageSourcePropType> = {
    [FaceEmotion.Neutral]: require('./images/neutral.png'),
    [FaceEmotion.Calm]: require('./images/calm.png'),
    [FaceEmotion.Angry]: require('./images/angry.png'),
};

const MorganFace: React.FunctionComponent<FaceProps> = props => {
    const { emotion, ...grid } = props;

    const size = emotion === FaceEmotion.Angry ? styles.large : styles.regular;

    return (
        <Grid variant="center" flex={1} margin="small" borderRadius="medium" {...grid}>
            <Image style={size} source={FACE_SOURCES[emotion]} />
        </Grid>
    );
};

const styles = StyleSheet.create({
    regular: { width: '125%', height: '125%', overflow: 'visible' },
    large: { width: '175%', height: '175%', overflow: 'visible' },
});

export default MorganFace;
