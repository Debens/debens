import React, { memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent } from 'react-native';

import {
    Button,
    RadioProps,
    RadioStatus,
    useRadioHandler,
    useRadioStatus,
} from '@training/mobile-atoms';
import { SemanticColor } from '@training/theme';

import { FacePackType } from '../../face-pack/model';
import FacePackPreview from '../FacePackPreview/FacePackPreview';

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

    return (
        <Button.Frame bg={backgroundColor} borderRadius="medium" {...button} onPress={onPressComposed}>
            <FacePackPreview type={value} />
        </Button.Frame>
    );
};

export default memo(FaceRadioOption);
