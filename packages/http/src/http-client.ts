import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Handler, Module } from './model';

export type Request<T = any> = AxiosRequestConfig<T>;
export type Response<T = any> = AxiosResponse<T>;
export type Error<T = unknown> = AxiosError<T>;

export class HTTPClient {
    private readonly modules: Module<Request, Response>[] = [];

    constructor(modules: Module<Request, Response>[] = []) {
        this.modules = modules;
    }

    extend(extension: Module<Request, Response>[]): HTTPClient {
        return new HTTPClient(extension.concat(this.modules));
    }

    async get<D = void>(url: string, config?: Request<void>): Promise<Response<D>> {
        return this.request({ ...config, url, method: 'GET' });
    }

    async post<P = void, D = void>(url: string, payload: P, config?: Request<void>): Promise<Response<D>> {
        return this.request({ ...config, url, method: 'POST', data: payload });
    }

    async put<P = void, D = void>(url: string, payload: P, config?: Request<void>): Promise<Response<D>> {
        return this.request({ ...config, url, method: 'PUT', data: payload });
    }

    async delete<D = void>(url: string, config?: Request<void>): Promise<Response<D>> {
        return this.request({ ...config, url, method: 'DELETE' });
    }

    async request<P = void, D = void>(config: Request<P>): Promise<Response<D>> {
        return this.modules.reduce<Handler<Request<P>, Response<D>>>(
            (handler, module) => request => module(request, handler),
            axios.request,
        )(config);
    }
}
