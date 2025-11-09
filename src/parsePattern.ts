import { type Pattern, createPattern } from "./Pattern.ts"

export function parsePattern(commandSpec: string): Pattern {
  const pattern = createPattern()
  const [argumentSpec, description] = commandSpec.split(" -- ")
  pattern.description = description
  const tokens = argumentSpec.split(" ")

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (!token.startsWith("-")) {
      pattern.argNames.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (token.startsWith("-")) {
      pattern.optionNames.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  return pattern
}
