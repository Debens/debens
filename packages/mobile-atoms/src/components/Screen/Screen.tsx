import React, { memo, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { SemanticColor } from '@debens/theme';
import { useHeaderHeight } from '@react-navigation/elements';

import { useColor } from '../../hooks/use-color/use-color';
import Grid, { GridProps } from '../Grid/Grid';

export type ScreenProps = GridProps & {
    top?: SemanticColor;
    bottom?: SemanticColor;
    edges?: ReadonlyArray<Edge>;
};

const TOP_EDGES: ReadonlyArray<Edge> = ['top', 'left', 'right'];
const BOTTOM_EDGES: ReadonlyArray<Edge> = ['bottom'];

const isEdge = (collection: ReadonlyArray<Edge>) => (edge: Edge) => collection.includes(edge);

export const Screen: React.FunctionComponent<ScreenProps> = props => {
    const { top: topColor, bottom: bottomColor, ...grid } = props;
    const top = useColor(topColor!);
    const bottom = useColor(bottomColor!);

    const edges = useMemo(() => {
        return {
            top: props.edges?.filter(isEdge(TOP_EDGES)),
            bottom: props.edges?.filter(isEdge(BOTTOM_EDGES)),
        };
    }, [props.edges]);

    const headerHeight = useHeaderHeight();

    return (
        <>
            <SafeAreaView edges={edges.top} style={[styles.shrink, { backgroundColor: top }]}>
                <StatusBar backgroundColor={top} animated />
            </SafeAreaView>
            <SafeAreaView edges={edges.bottom} style={[styles.grow, { backgroundColor: bottom }]}>
                <KeyboardAvoidingView
                    style={styles.grow}
                    behavior="padding"
                    keyboardVerticalOffset={headerHeight}
                    enabled={Platform.select({ android: false, default: true })}>
                    <Grid flex={1} backgroundColor="$background-primary" {...grid}>
                        {props.children}
                    </Grid>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

Screen.defaultProps = {
    top: '$background-primary',
    bottom: '$background-primary',
    edges: ['top', 'bottom'],
};

const styles = StyleSheet.create({
    grow: { flex: 1 },
    shrink: { flex: 0 },
});

export default memo(Screen);
