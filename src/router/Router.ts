import { recordMapValue } from "../helpers/record/recordMapValue.ts"
import { createRoutes } from "./createRoutes.ts"
import { type Handlers } from "./Handler.ts"
import { matchRoute } from "./matchRoute.ts"
import { parseRoute } from "./parseRoute.ts"
import type { Route } from "./Route.ts"

export class Router {
  name: string
  version: string

  specs: Record<string, string> = {}
  routes: Record<string, Route> = {}
  handlers: Handlers = {}

  constructor(name: string, version: string) {
    this.name = name
    this.version = version
  }

  bind(
    input: Record<string, string> | Array<string>,
    handlers: Handlers,
  ): void {
    const specs = createRoutes(input)

    this.specs = { ...this.specs, ...specs }
    const routes = recordMapValue(specs, parseRoute)
    this.routes = { ...this.routes, ...routes }
    this.handlers = { ...this.handlers, ...handlers }
  }

  async run(argv: Array<string>): Promise<void> {
    const [name, ...tokens] = argv
    if (name === undefined) {
      this.printNameAndVersion()
      this.printCommands()
      return
    }

    const route = this.routes[name]
    if (route === undefined) {
      this.printNameAndVersion()
      console.log(`unknown command: ${name}`)
      this.printCommands()
      return
    }

    const [args, options] = matchRoute(route, tokens)
    const handler = this.handlers[name]
    await handler(args, options, tokens)
  }

  printNameAndVersion() {
    console.log(`${this.name} ${this.version}`)
  }

  printCommands() {
    console.log(`commands:`)
    for (const [name, spec] of Object.entries(this.specs))
      console.log(`  ${name} ${spec}`)
  }
}
