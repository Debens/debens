import React, { memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent, Platform, StyleSheet } from 'react-native';

import {
    Button,
    Grid,
    Paragraph,
    RadioProps,
    RadioStatus,
    SVG,
    useRadioHandler,
    useRadioStatus,
} from '@debens/mobile-atoms';
import { SemanticColor } from '@debens/theme';

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

    const isSelected = status === RadioStatus.Selected;

    const borderColor = useMemo<SemanticColor>(() => {
        return isSelected ? '$field-selected-01' : '$background-primary';
    }, [isSelected]);

    const shadow = !isSelected ? styles.shadow : undefined;

    return (
        <Button.Frame
            style={shadow}
            bg="$field-01"
            borderRadius="medium"
            {...button}
            onPress={onPressComposed}>
            <FacePackPreview type={value}>
                <Grid flexDirection="row" alignItems="center">
                    <Paragraph my="medium" mr="auto">
                        {value}
                    </Paragraph>
                    {isSelected ? <SVG.RadioSelected /> : <SVG.RadioUnselected />}
                </Grid>
            </FacePackPreview>
        </Button.Frame>
    );
};

const styles = StyleSheet.create({
    shadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        android: {
            elevation: 5,
        },
    }),
});

export default memo(FaceRadioOption);
