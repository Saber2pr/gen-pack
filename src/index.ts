#!/usr/bin/env node

import { Terminal, FS } from '@saber2pr/node'
import { dirname, join, extname } from 'path'
import { pack } from './core'

const [
  input,
  output = join(dirname(input), 'bundle'.concat(extname(input)))
] = Terminal.getParams()

if (input === '-v') {
  Terminal.getCurrentPkgConfig(__dirname)
    .then(pkg => console.log(pkg.version))
    .catch(console.log)
} else {
  pack(input)
    .then(result => FS.writeFile(output, result))
    .catch(console.log)
}
