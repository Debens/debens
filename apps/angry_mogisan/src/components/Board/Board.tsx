import React, { memo } from 'react';

import { Grid } from '@training/mobile-atoms';

import Face from '../faces/Face/Face';

export interface BoardProps extends React.ComponentProps<typeof Grid> {
    state: boolean[][];
}

const Board: React.FunctionComponent<BoardProps> = props => {
    const { state, ...grid } = props;

    return (
        <Grid variant="center" maxHeight={500} {...grid}>
            {state.map((row, y) => (
                <Grid key={y} flex={1} flexDirection="row" justifyContent="space-around">
                    {row.map((_, x) => (
                        <Face key={`${x}${y}`} x={x} y={y} margin="small" />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default memo(Board);
