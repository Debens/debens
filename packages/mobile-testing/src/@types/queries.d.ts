import { Queries as LibraryQueries } from '@testing-library/react-native';
import { BuiltQueryMethods } from '@testing-library/react-native/build/helpers/makeQueries';

declare global {
    namespace Testing {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        export interface Queries extends LibraryQueries {}
    }
}
