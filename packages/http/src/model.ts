export type Handler<Req = void, Res = void> = (request: Req) => Promise<Res>;

export type Module<Req = void, Res = void> = (request: Req, next: Handler<Req, Res>) => Promise<Res>;
