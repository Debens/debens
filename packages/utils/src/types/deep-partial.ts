export type DeepPartial<T> = T extends Array<infer E>
  ? Array<DeepPartial<E>>
  : T extends Record<string, unknown>
  ? { [k in keyof T]?: DeepPartial<T[k]> }
  : T;
