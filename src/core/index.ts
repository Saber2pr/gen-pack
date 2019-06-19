/*
 * @Author: saber2pr
 * @Date: 2019-06-19 11:22:11
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 11:22:32
 */
import { createGraph } from './createGraph'
import { bundle } from './bundler'

export function pack(entry: string) {
  return createGraph(entry).then(bundle)
}
