import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import {
    Grid,
    Paragraph,
    RadioGroup,
    Screen,
    SVG,
    Toolbar,
} from '@training/mobile-atoms';

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
        <ScrollView bounces={false}>
            <Screen marginY="medium">
                <Toolbar>
                    <Toolbar.Item onPress={goBack}>
                        <SVG.ChevronLeft />
                    </Toolbar.Item>
                    <Toolbar.Item onPress={onProfiles}>
                        <SVG.Person />
                    </Toolbar.Item>
                </Toolbar>
                <Grid flex={1} variant="gutter">
                    <Paragraph typeset="$heading" my="medium">
                        Face Pack
                    </Paragraph>
                    <RadioGroup initial={current} onChange={update}>
                        {FACE_PACKS.map(pack => (
                            <FaceRadioOption key={pack} mb="medium" value={pack} />
                        ))}
                    </RadioGroup>
                </Grid>
            </Screen>
        </ScrollView>
    );
};

export default SettingsScreen;
