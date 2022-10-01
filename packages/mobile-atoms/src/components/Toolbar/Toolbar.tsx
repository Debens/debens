import React from 'react';

import { Button } from '../Button/Button';
import Grid, { GridProps } from '../Grid/Grid';

export type ToolbarItemProps = React.ComponentProps<typeof Button.Frame>;

export interface Toolbar extends React.FunctionComponent<React.PropsWithChildren<GridProps>> {
    Item: React.FunctionComponent<ToolbarItemProps>;
}

export const Toolbar: Toolbar = props => (
    <Grid flexDirection="row" justifyContent="space-between" mx="medium">
        {props.children}
    </Grid>
);

const ToolbarItem: React.FunctionComponent<ToolbarItemProps> = props => {
    return <Button.Frame {...props}>{props.children}</Button.Frame>;
};

ToolbarItem.defaultProps = {
    hitSlop: 'large',
};

Toolbar.Item = ToolbarItem;

export default Toolbar;
