import React, { memo, useMemo } from 'react';
import { Image, ImageResizeMode, Platform, StyleSheet } from 'react-native';

import { Grid } from '@training/mobile-atoms/src';

import { useBundledProfile } from '../../../face-book/bundled/use-bundled-profile';
import { BundledFace } from '../../../face-pack/model';
import { FaceProps } from '../model';

interface BundledFaceProps extends FaceProps {
    profile: BundledFace;
    resizeMode?: ImageResizeMode;
}

const BundledFace: React.FunctionComponent<BundledFaceProps> = props => {
    const { profile, emotion, resizeMode: resize, scaling, ...grid } = props;
    const { emotions } = useBundledProfile(profile.name);

    const size = useMemo(
        () => (scaling ? { height: `${scaling}%`, width: `${scaling}%` } : undefined),
        [scaling],
    );
    const resizeMode = Platform.select<ImageResizeMode | undefined>({
        android: 'contain' /* android doesn't allow view clipping */,
        default: resize,
    });

    if (!emotions[emotion]) return null;

    return (
        <Grid variant="center" flex={1} margin="small" borderRadius="medium" {...grid}>
            <Image resizeMode={resizeMode} style={[size, styles.image]} source={emotions[emotion]} />
        </Grid>
    );
};

BundledFace.defaultProps = { scaling: 100 };

const styles = StyleSheet.create({
    image: { overflow: 'visible' },
});

export default memo(BundledFace);
