import type { MaybePromise } from "../helpers/promise/index.ts"
import type { Handler, HandlerFunction } from "./Handler.ts"

export type Middleware = MiddlewareArray | MiddlewareFunction

export type MiddlewareArray = Array<Middleware>

export type MiddlewareFunction = (
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
  continuation: Handler,
) => MaybePromise<void>

export function applyMiddleware(
  middleware: Middleware,
  continuation: HandlerFunction,
): HandlerFunction {
  if (middleware instanceof Function) {
    return (args, options, tokens) =>
      middleware(args, options, tokens, continuation)
  } else {
    if (middleware.length === 0) {
      return continuation
    }

    const [head, ...rest] = middleware
    return applyMiddleware(head, applyMiddleware(rest, continuation))
  }
}
