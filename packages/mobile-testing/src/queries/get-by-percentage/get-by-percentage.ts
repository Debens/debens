import { within } from '@testing-library/react-native';
import {
    GetAllBy,
    makeQueries,
} from '@testing-library/react-native/build/helpers/makeQueries';

import { wrapQuery } from '../errors';

const getMultipleError = (percentage: number) =>
    `Found multiple elements with percentage: ${String(percentage)}`;

const getMissingError = (percentage: number) =>
    `Unable to find an element with percentage: ${String(percentage)}`;

export interface GetPercentageOptions {
    digits: number;
}

const DEFAULT_OPTIONS: GetPercentageOptions = { digits: 2 };

export type GetPercentageArguments = [percentage: number, options: GetPercentageOptions | void];
const getAllBy: GetAllBy<GetPercentageArguments> =
    instance =>
    (percentage, { digits } = DEFAULT_OPTIONS) =>
        within(instance).getAllByText(`${percentage.toFixed(digits)}%`);

const queries = makeQueries(getAllBy, getMultipleError, getMissingError);

export default {
    getByPercentage: wrapQuery(queries.getBy),
    getAllByPercentage: wrapQuery(queries.getAllBy),
    queryByPercentage: wrapQuery(queries.queryBy),
    findByPercentage: wrapQuery(queries.findBy),
    findAllByPercentage: wrapQuery(queries.findAllBy),
};
