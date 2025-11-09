import { type Pattern, createPattern } from "./Pattern.ts"

function tokenIsParameter(token: string): boolean {
  return !token.startsWith("[") && !token.startsWith("--")
}

function tokenIsOptionalParameter(token: string): boolean {
  return token.startsWith("[") && token.endsWith("]")
}

function tokenIsOption(token: string): boolean {
  return token.startsWith("--")
}

export function parsePattern(commandSpec: string): Pattern {
  const pattern = createPattern()
  const [argumentSpec, description] = commandSpec.split(" -- ")
  pattern.description = description
  const tokens = argumentSpec.split(" ")

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (tokenIsParameter(token)) {
      pattern.parameters.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (tokenIsOptionalParameter(token)) {
      pattern.optionalParameters.push(token.slice(1, -1))
    } else {
      tokens.unshift(token)
      break
    }
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (tokenIsOption(token)) {
      pattern.optionNames.push(token.slice(2))
    } else {
      tokens.unshift(token)
      break
    }
  }

  return pattern
}
