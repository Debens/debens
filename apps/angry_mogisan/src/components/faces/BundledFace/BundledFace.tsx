import React, { memo } from 'react';
import { Image, ImageResizeMode, Platform, StyleSheet } from 'react-native';

import { Grid } from '@training/mobile-atoms/src';

import { useBundledProfile } from '../../../face-book/bundled/use-bundled-profile';
import { BundledFace } from '../../../face-pack/model';
import { FaceProps } from '../model';

interface BundledFaceProps extends FaceProps {
    profile: BundledFace;
}

const BundledFace: React.FunctionComponent<BundledFaceProps> = props => {
    const { profile, emotion, ...grid } = props;
    const { emotions } = useBundledProfile(profile.name);

    if (!emotions[emotion]) return null;

    const resizeMode = Platform.select<ImageResizeMode>({
        android: 'contain' /* android doesn't allow view clipping */,
    });

    return (
        <Grid variant="center" flex={1} margin="small" borderRadius="medium" {...grid}>
            <Image resizeMode={resizeMode} style={styles.image} source={emotions[emotion]} />
        </Grid>
    );
};

const styles = StyleSheet.create({
    image: { width: '125%', height: '125%', overflow: 'visible' },
});

export default memo(BundledFace);
