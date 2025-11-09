import type { Pattern } from "./Pattern.ts"

export function matchPattern(
  pattern: Pattern,
  input: Array<string>,
): [args: Array<string>, options: Record<string, string>] {
  const args: Array<string> = []
  const options: Record<string, string> = {}
  // TODO
  return [args, options]
}
