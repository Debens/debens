export type OptionalKeys<T, K extends keyof T> = {
  [k in Extract<keyof T, K>]?: T[k];
} & { [k in Exclude<keyof T, K>]: T[k] };
