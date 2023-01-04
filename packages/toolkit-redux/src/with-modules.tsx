import React, { memo } from 'react';

import { DynamicModuleLoader, IModuleTuple } from 'redux-dynamic-modules';

export const withModules =
    (modules: IModuleTuple) =>
    <P extends object>(Component: React.ComponentType<P>) => {
        const Wrapper: React.FunctionComponent<P> = props => {
            return (
                <DynamicModuleLoader modules={modules}>
                    <Component {...props} />
                </DynamicModuleLoader>
            );
        };

        Wrapper.displayName = `withModules(${Component.displayName})`;

        return memo(Wrapper);
    };
