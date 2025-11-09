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
  commandSpecs: Record<string, string>
  patterns: Record<string, Pattern>
  handlers: CommandHandlers

  constructor(commandSpecs: Record<string, string>, handlers: CommandHandlers) {
    this.commandSpecs = commandSpecs
    this.patterns = recordMapValue(commandSpecs, parsePattern)
    this.handlers = handlers
  }

  async run(argv: Array<string>) {
    const [_interpreter, _script, name, ...tokens] = argv
    const pattern = this.patterns[name]
    if (pattern === undefined) {
      console.log(this.commandSpecs)
      return
    }

    const [args, options] = matchPattern(pattern, tokens)
    const handler = this.handlers[name]
    if (handler === undefined) {
      let message = `no handler for command`
      message += `\n  command name: ${name}`
      throw new Error(message)
    }

    await handler(args, options)
  }
}
