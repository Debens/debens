export const isDefined = <T>(candidate: T | undefined | null): candidate is T => !!candidate;
