import merge from 'deepmerge';

import { Request, Response } from '../../http-client';
import { Module } from '../../model';

type Token = string | null | undefined;

export interface BearerModuleParams {
    get token(): Token | Promise<Token>;
}

type BearerModule = (paras: BearerModuleParams) => Module<Request, Response>;

export const bearer: BearerModule = params => (request, next) => {
    const token = params.token;
    return token
        ? next(merge(request, { headers: { Authorization: `Bearer ${params.token}` } }))
        : next(request);
};
