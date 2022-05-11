import { ReactTestInstance } from 'react-test-renderer';

import * as library from '@testing-library/react-native';

import Workbench from './components/Workbench/Workbench';
import { Query } from './queries';

export * from '@testing-library/react-native';

type DefaultQueries = Query.FromBuilders<Query.Builders>;

const toQueries = (builders: Query.Builders, instance: ReactTestInstance): DefaultQueries =>
    Object.entries(builders)
        .map(([key, builder]) => ({ [key]: builder(instance) }))
        .reduce<DefaultQueries>((a, b) => Object.assign(a, b), {} as DefaultQueries);

type Options = library.RenderOptions;
type Render = (component: React.ReactElement<any>, options?: Options) => library.RenderAPI & Testing.Queries;

const DEFAULT_OPTIONS: Options = { wrapper: Workbench };
export const render: Render = (component, options) => {
    const render = library.render(component, Object.assign({}, DEFAULT_OPTIONS, options));

    return Object.assign(render, toQueries(Query.builders, render.container));
};
