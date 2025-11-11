import { type Route } from "./Route.ts"

export function createRoutes(
  input: Record<string, string> | Array<string>,
): Record<string, string> {
  if (input instanceof Array) {
    return Object.fromEntries(
      input.map((line) => {
        const [head, ...rest] = line.split(" ")
        return [head, rest.join(" ")]
      }),
    )
  }

  return input
}

export function parseRoute(spec: string): Route {
  const argNames: Array<string> = []
  const optionNames: Array<string> = []

  const tokens = spec.split(" -- ")[0].split(" ")

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
    argNames,
    optionNames,
    spec,
  }
}
