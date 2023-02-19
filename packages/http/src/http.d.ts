import { HTTPClient } from './http-client';
export declare namespace http {
    const client: HTTPClient;
    const modules: {
        domain: (domain: string) => import("./model").Module<import("./http-client").Request<any>, import("./http-client").Response<any>>;
        bearer: (paras: import("./modules/bearer/bearer").BearerModuleParams) => import("./model").Module<import("./http-client").Request<any>, import("./http-client").Response<any>>;
    };
}
