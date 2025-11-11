import type { Handler } from "./Handler.ts"

export type Middleware = MiddlewareArray | MiddlewareFunction

export type MiddlewareArray = Array<Middleware>

export type MiddlewareFunction = (
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
  continuation: Handler,
) => void
