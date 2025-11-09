export type Pattern = {
  parameters: Array<string>
  optionalParameters: Array<string>
  optionNames: Array<string>
  description: string
}

export function createPattern(): Pattern {
  return {
    parameters: [],
    optionalParameters: [],
    optionNames: [],
    description: "",
  }
}
