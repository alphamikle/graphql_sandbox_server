export type Uuid = string;
export type Nullable<T> = T | null;

export function unawaited(promise: Promise<void>): void {
  promise.then();
}