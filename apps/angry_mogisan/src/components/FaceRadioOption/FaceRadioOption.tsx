import React, { memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent } from 'react-native';

import {
    Button,
    Grid,
    RadioProps,
    RadioStatus,
    useRadioHandler,
    useRadioStatus,
} from '@training/mobile-atoms';
import { SemanticColor } from '@training/theme';

import { FacePackType } from '../../face-pack/model';
import { useRandomProfile } from '../FaceProvider/face-hooks';
import FaceFacade from '../faces/FaceFacade/FaceFacade';
import { FaceEmotion } from '../GameProvider/game-context';

interface FaceRadioOptionProps extends RadioProps<FacePackType>, React.ComponentProps<typeof Button.Frame> {}

const FaceRadioOption = (props: FaceRadioOptionProps) => {
    const { value, onPress, ...button } = props;
    const status = useRadioStatus(value);

    const onSelect = useRadioHandler(value);
    const onPressComposed = useCallback(
        (event: GestureResponderEvent) => {
            onPress?.(event);
            onSelect();
        },
        [onPress, onSelect],
    );

    const backgroundColor = useMemo<SemanticColor>(() => {
        return status === RadioStatus.Selected ? '$field-selected-01' : '$field-01';
    }, [status]);

    const [profile] = useRandomProfile(value);

    return (
        <Button.Frame bg={backgroundColor} borderRadius="medium" {...button} onPress={onPressComposed}>
            <Grid height={150} flexDirection="row" justifyContent="flex-end" p="medium">
                <FaceFacade profile={profile} emotion={FaceEmotion.Neutral} />
                <FaceFacade profile={profile} emotion={FaceEmotion.Calm} />
                <FaceFacade profile={profile} emotion={FaceEmotion.Angry} />
            </Grid>
        </Button.Frame>
    );
};

export default memo(FaceRadioOption);
