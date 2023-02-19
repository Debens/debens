export declare const modules: {
    domain: (domain: string) => import("..").Module<import("../http-client").Request<any>, import("../http-client").Response<any>>;
    bearer: (paras: import("./bearer/bearer").BearerModuleParams) => import("..").Module<import("../http-client").Request<any>, import("../http-client").Response<any>>;
};
