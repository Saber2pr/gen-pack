/*
 * @Author: saber2pr
 * @Date: 2019-06-19 10:19:40
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 11:17:41
 */
import { FS } from '@saber2pr/node'
import { FileNode } from './ast'
import { getImports } from './getImports'
import { dirname, join, extname } from 'path'
import { resolve_node } from './resolve-node'
import { compose } from './compose'

export async function createAsset(path: string): Promise<FileNode> {
  const buffer = await FS.readFile(path)

  const absolutify = (dep: string) => join(dirname(path), dep)
  const setExt = (s: string) => s + extname(path)
  const verifyName = compose(
    absolutify,
    setExt
  )

  const text = buffer.toString()

  const deps = getImports(text)

  return Promise.all(deps.map(dep => resolveDep(dep))).then(deps => ({
    path,
    text,
    deps: deps.map(verifyName),
    mapping: deps.reduce(
      (receiver, dep) => ({ ...receiver, [dep]: verifyName(dep) }),
      {}
    )
  }))
}

const resolveDep = (s: string) => (!s.startsWith('.') ? resolve_node(s) : s)
