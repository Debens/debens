/* https://github.com/testing-library/dom-testing-library/blob/main/types/query-helpers.d.ts */
declare module '@testing-library/react-native/build/helpers/makeQueries' {
    export type GetErrorFunction<Arguments extends any[] = [string]> = (...args: Arguments) => string;

    /**
     * query methods have a common call signature. Only the return type differs.
     */
    export type QueryMethod<Arguments extends any[] = [], Return> = (
        instance: ReactTestInstance,
    ) => (...args: Arguments) => Return;

    export type QueryBy<Arguments extends any[] = []> = QueryMethod<Arguments, ReactTestInstance>;

    export type GetAllBy<Arguments extends any[] = []> = QueryMethod<Arguments, ReactTestInstance[]>;

    export type FindAllBy<Arguments extends any[] = []> = QueryMethod<
        [Arguments[0], Arguments[1]?, waitForOptions?],
        Promise<ReactTestInstance[]>
    >;

    export type GetBy<Arguments extends any[] = []> = QueryMethod<Arguments, ReactTestInstance>;

    export type FindBy<Arguments extends any[] = []> = QueryMethod<
        [Arguments[0], Arguments[1]?, waitForOptions?],
        Promise<ReactTestInstance>
    >;

    export type BuiltQueryMethods<Arguments extends any[]> = {
        getBy: QueryBy<Arguments>;
        getAllBy: GetAllBy<Arguments>;
        queryBy: GetBy<Arguments>;
        findBy: FindBy<Arguments>;
        findAllBy: FindAllBy<Arguments>;
    };

    export function makeQueries<Arguments extends any[]>(
        queryAllBy: GetAllBy<Arguments>,
        getMultipleError: GetErrorFunction<Arguments>,
        getMissingError: GetErrorFunction<Arguments>,
    ): BuiltQueryMethods<Arguments>;
}
