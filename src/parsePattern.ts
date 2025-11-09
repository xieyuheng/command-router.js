import { type Pattern, createPattern } from "./Pattern.ts"

export function parsePattern(commandSpec: string): Pattern {
  const pattern = createPattern()
  const tokens = commandSpec.split(" ")

  while (tokens.length > 0) {
    const token = tokens.pop()
  }

  while (tokens.length > 0) {
    const token = tokens.pop()
  }

  while (tokens.length > 0) {
    const token = tokens.pop()
  }

  while (tokens.length > 0) {
    const token = tokens.pop()
  }


  return pattern
}
