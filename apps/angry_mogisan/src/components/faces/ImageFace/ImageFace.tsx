import React, { memo, useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Grid } from '@debens/mobile-atoms';

import { ImageFace } from '../../../face-book/model';
import { BaseFaceProps } from '../model';

interface ImageFaceProps extends ImageFace, BaseFaceProps {}

const useScale = (scaling: number) => {
    /* Android doesn't allow image view clipping without native methods. */
    return useMemo(() => {
        return scaling
            ? {
                  image: styles.fill,
                  container: { height: `${scaling}%`, width: `${scaling}%` },
              }
            : undefined;
    }, [scaling]);
};

const ImageFace: React.FunctionComponent<ImageFaceProps> = props => {
    const { emotions, emotion, scaling, ...grid } = props;

    const scale = useScale(scaling);
    if (!emotions[emotion]) return null;

    return (
        <Grid variant="center" position="relative" flex={1}>
            <Grid position="absolute" size={scale?.container} {...grid}>
                <Image resizeMode="contain" style={[scale?.image, styles.image]} source={emotions[emotion]} />
            </Grid>
        </Grid>
    );
};

ImageFace.defaultProps = { scaling: 100 };

const styles = StyleSheet.create({
    fill: { height: `100%`, width: `100%` },
    image: { overflow: 'visible' },
});

export default memo(ImageFace);
