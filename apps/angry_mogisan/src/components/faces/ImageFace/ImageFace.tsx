import React, { memo, useMemo } from 'react';
import { Image, ImageResizeMode, Platform, StyleSheet } from 'react-native';

import { Grid } from '@training/mobile-atoms';

import { ImageFace } from '../../../face-book/model';
import { BaseFaceProps } from '../model';

interface ImageFaceProps extends ImageFace, BaseFaceProps {
    resizeMode?: ImageResizeMode;
}

const ImageFace: React.FunctionComponent<ImageFaceProps> = props => {
    const { emotions, emotion, resizeMode: resize, scaling, ...grid } = props;

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
        <Grid variant="center" margin="small" borderRadius="medium" {...grid}>
            <Image resizeMode={resizeMode} style={[size, styles.image]} source={emotions[emotion]} />
        </Grid>
    );
};

ImageFace.defaultProps = { scaling: 100 };

const styles = StyleSheet.create({
    image: { overflow: 'visible' },
});

export default memo(ImageFace);
