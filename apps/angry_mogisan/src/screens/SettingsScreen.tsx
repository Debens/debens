import React from 'react';

import { useNavigation } from '@react-navigation/core';
import {
    Grid,
    Paragraph,
    RadioGroup,
    Screen,
    SVG,
    Toolbar,
} from '@training/mobile-atoms';

import { useFacePack } from '../components/FaceProvider/FaceProvider';
import FaceRadioOption from '../components/FaceRadioOption/FaceRadioOption';
import { FacePack } from '../components/faces/model';
import { withGame } from '../components/GameProvider/GameProvider';

const FACE_PACKS = Object.values(FacePack);

export const SettingsScreen: React.FunctionComponent = () => {
    const { goBack } = useNavigation();

    const [current, update] = useFacePack();

    return (
        <Screen marginY="medium">
            <Toolbar>
                <Toolbar.Item onPress={goBack}>
                    <SVG.ChevronLeft />
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
    );
};

export default withGame(SettingsScreen);
