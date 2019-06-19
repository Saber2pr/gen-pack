/*
 * @Author: saber2pr
 * @Date: 2019-06-19 09:18:20
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 11:29:17
 */
import { createIterator } from './createIterator'

const include = /require\(.*\)/g

const str = /".*"/

export function getImports(code: string) {
  const importIt = createIterator(include)

  return Array.from(importIt(code))
    .map(require => str.exec(require)[0])
    .map(name => name.replace(/"/g, ''))
}
