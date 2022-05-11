import { ReactTestInstance } from 'react-test-renderer';

import { QueryMethod } from '@testing-library/react-native/build/helpers/makeQueries';

export class QueryError extends Error {
    constructor(message: string, callsite: Function) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, callsite);
        }
    }
}

export const wrapQuery =
    <Arguments extends any[], Return>(query: QueryMethod<Arguments, Return>) =>
    (instance: ReactTestInstance) =>
        function callsite(...args: Arguments) {
            try {
                return query(instance)(...args);
            } catch (error: any) {
                throw new QueryError(error, callsite);
            }
        };
