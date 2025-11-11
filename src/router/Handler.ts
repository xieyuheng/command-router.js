import type { MaybePromise } from "../helpers/promise/index.ts"

export type Handlers = Record<string, Handler>

export type Handler = (
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
) => MaybePromise<void>

export async function applyHandler(
  handler: Handler,
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
): Promise<void> {
  return await handler(args, options, tokens)
}
