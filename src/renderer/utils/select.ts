import { select as sagaSelect, SelectEffect, Tail } from "redux-saga/effects";

export function* select<
  Fn extends (state: unknown, ...args: unknown[]) => unknown,
>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
): Generator<SelectEffect, ReturnType<Fn>, ReturnType<Fn>> {
  return yield sagaSelect(selector, ...args);
}
