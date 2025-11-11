import type { Route } from "./Route.ts"

export function matchRoute(
  route: Route,
  inputTokens: Array<string>,
): [args: Array<string>, options: Record<string, string>] {
  const tokens = [...inputTokens]
  const args: Array<string> = []
  const options: Record<string, string> = {}
  for (const argName of route.argNames) {
    const token = tokens.shift()
    if (token === undefined) {
      let message = `[Router] ${route.command}`
      message += `\n  input tokens: ${inputTokens.join(" ")}`
      message += `\n  missing argument: ${argName}`
      console.log(message)
      process.exit(1)
    }

    args.push(token)
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (route.optionNames.includes(token)) {
      const nextToken = tokens.shift()
      if (nextToken === undefined) {
        options[token] = ""
      } else if (nextToken.startsWith("-")) {
        tokens.unshift(nextToken)
        options[token] = ""
      } else {
        options[token] = nextToken
      }
    }
  }

  return [args, options]
}
