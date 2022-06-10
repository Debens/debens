import { Request, Response } from '../../http-client';
import { Module } from '../../model';

type DomainModule = (domain: string) => Module<Request, Response>;

export const domain: DomainModule = domain => (request, next) =>
    next(Object.assign(request, { url: domain + request.url }));
