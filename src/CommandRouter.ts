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
  commands: Record<string, string>
  patterns: Record<string, Pattern>
  handlers: CommandHandlers

  constructor(commands: Record<string, string>, handlers: CommandHandlers) {
    this.commands = commands
    this.patterns = recordMapValue(commands, parsePattern)
    this.handlers = handlers
  }

  async run(argv: Array<string>) {
    const [_interpreter, _script, name, ...restInput] = argv
    const pattern = this.patterns[name]
    if (pattern === undefined) {
      console.log(this.commands)
      return
    }

    const [args, options] = matchPattern(pattern, restInput)
    const handler = this.handlers[name]
    if (handler === undefined) {
      let message = `no handler for command`
      message += `\n  command name: ${name}`
      throw new Error(message)
    }

    await handler(args, options)
  }
}
