import { Request, Response } from '../../http-client';
import { Module } from '../../model';
declare type DomainModule = (domain: string) => Module<Request, Response>;
export declare const domain: DomainModule;
export {};
