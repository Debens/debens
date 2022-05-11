import {
    GetAllBy,
    GetErrorFunction,
    makeQueries,
} from '@testing-library/react-native/build/helpers/makeQueries';

import { wrapQuery } from './errors';

type QueryType<Name extends string> =
    | `getBy${Name}`
    | `getAllBy${Name}`
    | `queryBy${Name}`
    | `findBy${Name}`
    | `findAllBy${Name}`;

type StandardQueryBuilders<Name extends string> = {
    [k in QueryType<Name>]: Function;
};

export const buildQueries = <Arguments extends any[], Name extends string>(
    name: Name,
    getAllBy: GetAllBy<Arguments>,
    getMultipleError: GetErrorFunction<Arguments>,
    getMissingError: GetErrorFunction<Arguments>,
): StandardQueryBuilders<Name> => {
    const queries = makeQueries(getAllBy, getMultipleError, getMissingError);

    const entries = new Map<QueryType<Name>, Function>([
        [`getBy${name}`, wrapQuery(queries.getBy)],
        [`getAllBy${name}`, wrapQuery(queries.getAllBy)],
        [`queryBy${name}`, wrapQuery(queries.queryBy)],
        [`findBy${name}`, wrapQuery(queries.findBy)],
        [`findAllBy${name}`, wrapQuery(queries.findAllBy)],
    ]).entries();
    return Object.fromEntries(entries) as unknown as StandardQueryBuilders<Name>;
};
