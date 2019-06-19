/*
 * @Author: saber2pr
 * @Date: 2019-06-18 22:48:46
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 11:14:13
 */
import { FileNode } from './ast'
import { createAsset } from './createAsset'

export async function createGraph(entry: string, stack = [entry]) {
  const result: FileNode[] = []

  while (stack.length) {
    const file = await createAsset(stack.shift())
    result.push(file)
    stack.push(...file.deps)
  }

  return result
}
