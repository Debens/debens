import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { SemanticColor } from '@training/theme';

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
    const top = useColor(props.top!);
    const bottom = useColor(props.bottom!);

    const edges = useMemo(() => {
        return {
            top: props.edges?.filter(isEdge(TOP_EDGES)),
            bottom: props.edges?.filter(isEdge(BOTTOM_EDGES)),
        };
    }, [props.edges]);

    return (
        <>
            <SafeAreaView edges={edges.top} style={[styles.shrink, { backgroundColor: top }]} />
            <SafeAreaView edges={edges.bottom} style={[styles.grow, { backgroundColor: bottom }]}>
                <Grid flex={1} backgroundColor="$background-primary" {...props}>
                    {props.children}
                </Grid>
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
