import React from 'react';

import { ThemeProvider, themes } from '@debens/theme';

import seedrandom from 'seedrandom';

import FaceProvider from './components/FaceProvider/FaceProvider';
import { facebook } from './face-book';
import { FacePackType } from './face-pack/model';
import AppNavigator, { AppNavigatorProps } from './navigation/AppNavigator';

Object.assign(Math, { seedrandom });

// node_modules/shuffle-seed/shuffle-seed.js
declare global {
    export interface Math {
        seedrandom: typeof seedrandom;
    }
}

export const App = (props: AppNavigatorProps) => {
    return (
        <FaceProvider source={facebook} pack={FacePackType.Mogan}>
            <ThemeProvider theme={themes.mógan}>
                <AppNavigator {...props} />
            </ThemeProvider>
        </FaceProvider>
    );
};

export default App;
