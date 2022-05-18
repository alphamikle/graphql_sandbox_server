import { Nullable } from './types';

type NullOrUndefined = null | undefined;
type Milliseconds = number;

export function isDefined<T>(value: T | NullOrUndefined): value is T {
  return value !== undefined && value !== null;
}

export function isNotDefined<T>(value: T | NullOrUndefined): value is NullOrUndefined {
  return value === null || value === undefined;
}

export async function wait(delay: Milliseconds) {
  return await new Promise(res => setTimeout(res, delay));
}

export function updateField<T, V extends keyof T>(objectToChange: T, field: V, value: Nullable<T[V]>): T {
  if (isDefined(value)) {
    objectToChange[field] = value;
  }
  return objectToChange;
}