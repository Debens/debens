import { Request, Response } from '../../http-client';
import { Module } from '../../model';
declare type Token = string | null | undefined;
export interface BearerModuleParams {
    get token(): Token | Promise<Token>;
}
declare type BearerModule = (paras: BearerModuleParams) => Module<Request, Response>;
export declare const bearer: BearerModule;
export {};
