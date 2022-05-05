import React, { memo } from 'react';

import { themes } from '@training/theme';

import { ThemeProvider } from 'styled-components';

type WorkbenchProps = React.PropsWithChildren<{}>;

export const Workbench: React.FunctionComponent<WorkbenchProps> = (props) => {
    return <ThemeProvider theme={themes.light}>{props.children}</ThemeProvider>;
};

export default memo(Workbench);
