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

import FaceFacade from '../faces/FaceFacade/FaceFacade';
import { FacePack } from '../faces/model';
import { FaceEmotion } from '../GameProvider/game-context';

interface FaceRadioOptionProps extends RadioProps<FacePack>, React.ComponentProps<typeof Button.Frame> {}

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

    return (
        <Button.Frame bg={backgroundColor} borderRadius="medium" {...button} onPress={onPressComposed}>
            <Grid height={150} flexDirection="row" justifyContent="flex-end" p="medium">
                <FaceFacade pack={value} emotion={FaceEmotion.Neutral} />
                <FaceFacade pack={value} emotion={FaceEmotion.Calm} />
                <FaceFacade pack={value} emotion={FaceEmotion.Angry} />
            </Grid>
        </Button.Frame>
    );
};

export default memo(FaceRadioOption);
