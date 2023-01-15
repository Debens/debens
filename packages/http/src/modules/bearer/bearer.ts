import merge from 'deepmerge';

import { Request, Response } from '../../http-client';
import { Module } from '../../model';

export interface BearerModuleParams {
    get token(): string | Promise<string>;
}

type BearerModule = (paras: BearerModuleParams) => Module<Request, Response>;

export const bearer: BearerModule = params => (request, next) =>
    next(
        merge(request, {
            headers: {
                Authorization: `Bearer ${params.token}`,
            },
        }),
    );
