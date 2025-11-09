export type Pattern = {
  argNames: Array<string>
  optionNames: Array<string>
  description: string
}

export function createPattern(): Pattern {
  return {
    argNames: [],
    optionNames: [],
    description: "",
  }
}
