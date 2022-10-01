import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

import { Grid } from '@training/mobile-atoms';

import { FaceEmotion } from '../../GameProvider/game-context';
import { FaceProps } from '../model';

const FACE_SOURCES: Record<FaceEmotion, ImageSourcePropType> = {
    [FaceEmotion.Neutral]: require('./images/happy-taz.png'),
    [FaceEmotion.Calm]: require('./images/happy-taz.png'),
    [FaceEmotion.Angry]: require('./images/angry-taz.png'),
};

const TazFace: React.FunctionComponent<FaceProps> = props => {
    const { emotion, ...grid } = props;

    const size = emotion === FaceEmotion.Angry ? styles.large : styles.regular;

    return (
        <Grid variant="center" flex={1} margin="small" borderRadius="medium" {...grid}>
            <Image style={[styles.image, size]} source={FACE_SOURCES[emotion]} />
        </Grid>
    );
};

const styles = StyleSheet.create({
    image: { overflow: 'visible' },
    regular: { width: '150%', height: '150%' },
    large: { width: '100%', height: '100%' },
});

export default TazFace;
