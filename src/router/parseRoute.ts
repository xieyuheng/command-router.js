import { type Route } from "./Route.ts"

export function parseRoute(command: string): Route {
  command = command.split(" -- ")[0]

  const [name, ...tokens] = command.split(" ")

  const argNames: Array<string> = []
  const optionNames: Array<string> = []

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (!token.startsWith("-")) {
      argNames.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (token.startsWith("-")) {
      optionNames.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  return {
    command,
    name,
    argNames,
    optionNames,
  }
}
