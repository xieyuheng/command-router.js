#!/usr/bin/env -S node

import { CommandRouter } from "./index.ts"

const router = new CommandRouter()

const routes = {
  add: "x y --version -- add two numbers",
  mul: "x y -- mul two numbers",
}

router.bind(routes, {
  add: ([x, y]) => console.log(Number(x) + Number(y)),
  mul: ([x, y]) => console.log(Number(x) * Number(y)),
})

await router.run(process.argv)
