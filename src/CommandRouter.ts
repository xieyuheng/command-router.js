import type { MaybePromise } from "./helpers/promise/index.ts"
import { recordMapValue } from "./helpers/record/recordMapValue.ts"
import { matchPattern } from "./matchPattern.ts"
import { parsePattern } from "./parsePattern.ts"
import { type Pattern } from "./Pattern.ts"

export type CommandHandlers = Record<
  string,
  (args: Array<string>, options: Record<string, string>) => MaybePromise<void>
>

export class CommandRouter {
  specs: Record<string, string> = {}
  patterns: Record<string, Pattern> = {}
  handlers: CommandHandlers = {}

  bind(specs: Record<string, string>, handlers: CommandHandlers): void {
    checkHandlers(specs, handlers)

    this.specs = { ...this.specs, ...specs }
    const patterns = recordMapValue(specs, parsePattern)
    this.patterns = { ...this.patterns, ...patterns }
    this.handlers = { ...this.handlers, ...handlers }
  }

  async run(argv: Array<string>): Promise<void> {
    const [_interpreter, _script, name, ...tokens] = argv
    const pattern = this.patterns[name]
    if (pattern === undefined) {
      console.log(this.specs)
      return
    }

    const [args, options] = matchPattern(pattern, tokens)
    const handler = this.handlers[name]
    await handler(args, options)
  }
}

function checkHandlers(
  specs: Record<string, string>,
  handlers: CommandHandlers,
): void {
  const specNames = Object.keys(specs)
  const handlerNames = Object.keys(handlers)
  if (!setEqual(new Set(specNames), new Set(handlerNames))) {
    let message = `[CommandRouter.bind] handler mismatch`
    message += `\n  command spec names: ${specNames.join(" ")}`
    message += `\n  handler names: ${handlerNames.join(" ")}`
    throw new Error(message)
  }
}
