# command-router.js

A simple library for building CLI with sub-commands in Node.js.

## Usage

```typescript
import { CommandRouter } from "@xieyuheng/command-router.js"

const router = new CommandRouter("calculator", "0.1.0")

const routes = {
  add: "x y -- add two numbers",
  mul: "-x --y -- mul two numbers",
}

router.bind(routes, {
  add: ([x, y]) => {
    console.log(Number(x) + Number(y))
  },
  mul: (args, options) => {
    console.log(Number(options["-x"]) * Number(options["--y"]))
  },
})

await router.run(["add", "2", "2"])
await router.run(["mul", "-x", "3", "--y", "3"])
```

## License

[GPLv3](LICENSE)
