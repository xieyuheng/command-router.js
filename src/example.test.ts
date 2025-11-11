import * as cmd from "./index.ts"

function logger(): cmd.Middleware {
  return (args, options, tokens, continuation) => {
    console.log({ args, options, tokens })
    return continuation(args, options, tokens)
  }
}

const router = cmd.createRouter("calculator", "0.1.0", {
  middleware: [logger()],
})

router.defineRoutes([
  "add x y -- add two numbers and print the result",
  "mul --x --y -- mul two numbers and print the result",
])

router.defineHandlers({
  add: ([x, y]) => {
    console.log(Number(x) + Number(y))
  },
  mul: (args, options) => {
    console.log(Number(options["--x"]) * Number(options["--y"]))
  },
})

await router.run(["add", "2", "2"])
await router.run(["mul", "--x", "3", "--y", "3"])
