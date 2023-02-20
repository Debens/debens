import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Grid, Paragraph, RadioGroup, Screen, SVG, Toolbar } from '@debens/mobile-atoms';
import { useNavigation } from '@react-navigation/native';

import { useCurrentFacePackType } from '../components/FaceProvider/face-hooks';
import FaceRadioOption from '../components/FaceRadioOption/FaceRadioOption';
import { FacePackType } from '../face-pack/model';
import { AppRoute } from '../navigation/routes';

const FACE_PACKS = Object.values(FacePackType);

export const SettingsScreen: React.FunctionComponent = () => {
    const { goBack, navigate } = useNavigation();

    const [current, update] = useCurrentFacePackType();

    const onProfiles = useCallback(() => {
        navigate(AppRoute.Facebook);
    }, [navigate]);

    return (
        <Screen marginY="medium">
            <ScrollView style={styles.grow} bounces={false}>
                <Toolbar>
                    <Toolbar.Item onPress={goBack} left>
                        <SVG.ChevronLeft />
                    </Toolbar.Item>
                    <Toolbar.Spacer />
                    <Toolbar.Item onPress={onProfiles}>
                        <SVG.Person />
                    </Toolbar.Item>
                </Toolbar>
                <Grid flex={1} variant="gutter" my="medium">
                    <RadioGroup initial={current} onChange={update}>
                        {FACE_PACKS.map(pack => (
                            <FaceRadioOption key={pack} mb="medium" value={pack} />
                        ))}
                    </RadioGroup>
                </Grid>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    grow: { flex: 1 },
});

export default SettingsScreen;
