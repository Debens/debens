import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { Grid, Screen, SVG, Toolbar } from '@debens/mobile-atoms';
import { useNavigation } from '@react-navigation/core';

import FacePreview from '../components/FacePreview/FacePreview';
import { useFaceNames, useFaceSource } from '../components/FaceProvider/face-hooks';
import { isDefined } from '../utils/is-defined';

export const FacebookScreen: React.FunctionComponent = () => {
    const { goBack } = useNavigation();

    const names = useFaceNames();
    const source = useFaceSource();
    const faces = useMemo(() => {
        return names
            .map(name => ({ name, source: source.get(name)! }))
            .filter(({ source }) => isDefined(source));
    }, [source, JSON.stringify(names)]);

    const { width } = useWindowDimensions();
    const size = width / 4;

    return (
        <Screen marginY="medium">
            <ScrollView style={styles.grow} bounces={false}>
                <Toolbar>
                    <Toolbar.Item onPress={goBack}>
                        <SVG.ChevronLeft />
                    </Toolbar.Item>
                </Toolbar>
                <Grid flex={1} variant="gutter" mt="medium">
                    <Grid flexDirection="row" flexWrap="wrap" justifyContent="center">
                        {faces.map((face, i) => (
                            <FacePreview
                                key={i}
                                height={size}
                                width={size}
                                backgroundColor="$layer-01"
                                m="small"
                                {...face}
                            />
                        ))}
                    </Grid>
                </Grid>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    grow: { flex: 1 },
});

export default FacebookScreen;
